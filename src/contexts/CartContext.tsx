import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [user]);

  async function refreshCart() {
    if (!user) return;

    try {
      setLoading(true);
      const { data: cartData } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!cartData) {
        const { data: newCart } = await supabase
          .from('cart')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (newCart) {
          setItems([]);
        }
        return;
      }

      const { data: itemsData } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('cart_id', cartData.id);

      setItems((itemsData as any) || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(productId: string, quantity: number) {
    if (!user) return;

    try {
      const { data: cartData } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      let cartId = cartData?.id;

      if (!cartId) {
        const { data: newCart } = await supabase
          .from('cart')
          .insert({ user_id: user.id })
          .select()
          .single();
        cartId = newCart?.id;
      }

      const { data: product } = await supabase
        .from('products')
        .select('price, sale_price')
        .eq('id', productId)
        .single();

      const price = product?.sale_price || product?.price || 0;

      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cartId)
        .eq('product_id', productId)
        .maybeSingle();

      if (existingItem) {
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
      } else {
        await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            product_id: productId,
            quantity,
            price,
          });
      }

      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async function updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }

    try {
      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  async function removeItem(itemId: string) {
    try {
      await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      await refreshCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  async function clearCart() {
    if (!user) return;

    try {
      const { data: cartData } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (cartData) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cartData.id);
      }

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items,
    itemCount,
    subtotal,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
