import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey, X-Paystack-Signature',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const event = body.event;
    const data = body.data;

    console.log('Webhook received:', event);

    if (event === 'charge.success') {
      const reference = data.reference;
      const amount = data.amount / 100;

      const { data: payment } = await supabase
        .from('payments')
        .select('order_id')
        .eq('payment_reference', reference)
        .maybeSingle();

      if (payment) {
        await supabase
          .from('payments')
          .update({
            status: 'success',
            payment_data: data,
          })
          .eq('payment_reference', reference);

        await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            status: 'processing',
          })
          .eq('id', payment.order_id);

        const { data: orderItems } = await supabase
          .from('order_items')
          .select('product_id, quantity')
          .eq('order_id', payment.order_id);

        if (orderItems) {
          for (const item of orderItems) {
            const { data: product } = await supabase
              .from('products')
              .select('stock_quantity')
              .eq('id', item.product_id)
              .single();

            if (product) {
              const newQuantity = product.stock_quantity - item.quantity;

              await supabase
                .from('products')
                .update({ stock_quantity: newQuantity })
                .eq('id', item.product_id);

              await supabase.from('inventory_logs').insert({
                product_id: item.product_id,
                type: 'stock_out',
                quantity: -item.quantity,
                previous_quantity: product.stock_quantity,
                new_quantity: newQuantity,
                reference_type: 'order',
                reference_id: payment.order_id,
                notes: 'Stock reduced due to paid order (webhook)',
              });
            }
          }
        }

        console.log('Order updated successfully:', payment.order_id);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
