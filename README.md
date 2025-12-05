# LuxeFurniture - Complete Furniture eCommerce System

A modern, production-ready furniture eCommerce platform built with React, TypeScript, Tailwind CSS, Supabase, and Paystack payment integration.

## Features

### Customer Features
- Beautiful homepage with hero banner and featured products
- Advanced product catalog with filters (category, price, material, color, stock status)
- Product sorting (newest, price low-to-high, price high-to-low, name)
- Detailed product pages with multiple images, specifications, and reviews
- Shopping cart with quantity management
- Wishlist system
- Secure checkout with Paystack payment gateway (test mode)
- Order tracking and history
- Customer account dashboard
- Responsive design for mobile, tablet, and desktop

### Admin Features (Demo Panel)
- Admin dashboard with key metrics
  - Total revenue
  - Total orders
  - Total customers
  - Low stock alerts
- Recent orders overview
- Product management (view products)
- Order management (view orders)
- Customer management (view customers)
- Inventory tracking with automatic stock updates

### Technical Features
- **Authentication**: Email/password authentication via Supabase Auth
- **Database**: PostgreSQL with Supabase
- **Payment**: Paystack integration with webhook support
- **Real-time Updates**: Automatic stock reduction on successful payments
- **Inventory Management**: Comprehensive inventory logging system
- **Promo Codes**: Discount system with percentage and fixed discounts
- **Security**: Row Level Security (RLS) policies on all tables
- **Responsive**: Mobile-first design with Tailwind CSS

## Demo Credentials

### Admin Account
- **Email**: admin@demo.com
- **Password**: Admin123!

**Note**: You need to create this account first by:
1. Click "Sign In" button
2. Click "Create one"
3. Enter the admin credentials above
4. Sign in

Once created, the account will have admin privileges.

### Test Promo Codes
- **WELCOME10**: 10% off on orders over $100
- **SAVE50**: $50 off on orders over $500
- **SUMMER25**: 25% off on orders over $200

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Paystack (Test Mode)
- **Icons**: Lucide React
- **Deployment**: Ready for production deployment

## Database Schema

### Core Tables
- `users` - User accounts with role management
- `products` - Product catalog with full details
- `product_images` - Multiple images per product
- `product_variants` - Product variations (size, color, etc.)
- `categories` - Product categorization
- `cart` & `cart_items` - Shopping cart functionality
- `wishlist` - Customer wishlist
- `orders` & `order_items` - Order management
- `payments` - Payment transaction records
- `reviews` - Product reviews and ratings
- `promo_codes` - Discount code system
- `inventory_logs` - Stock movement tracking
- `addresses` - Customer shipping addresses
- `banners` - Homepage banner management

## Setup Instructions

### 1. Environment Variables
The `.env` file is already configured with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_demo_key_for_testing
```

### 2. Database Setup
The database schema has been automatically created with:
- All necessary tables
- Row Level Security (RLS) policies
- Indexes for performance
- Demo data including 12 furniture products

### 3. Create Admin Account
1. Run the development server (already running)
2. Click "Sign In" → "Create one"
3. Use credentials: admin@demo.com / Admin123!
4. This account will have admin access

### 4. Paystack Setup (Optional for Testing)
To enable real Paystack payments:
1. Sign up at https://paystack.com
2. Get your test public key from the dashboard
3. Update `VITE_PAYSTACK_PUBLIC_KEY` in `.env`
4. Configure webhook URL: `https://your-project.supabase.co/functions/v1/paystack-webhook`

## Application Structure

```
src/
├── components/
│   ├── auth/              # Login and registration modals
│   ├── cart/              # Shopping cart components
│   └── layout/            # Header and navigation
├── contexts/
│   ├── AuthContext.tsx    # Authentication state management
│   └── CartContext.tsx    # Shopping cart state management
├── pages/
│   ├── HomePage.tsx       # Landing page
│   ├── ShopPage.tsx       # Product catalog
│   ├── ProductDetailPage.tsx
│   ├── CheckoutPage.tsx
│   ├── OrderSuccessPage.tsx
│   ├── AccountPage.tsx
│   ├── OrdersPage.tsx
│   ├── WishlistPage.tsx
│   └── AdminDashboard.tsx
├── types/                 # TypeScript type definitions
└── lib/                   # Supabase client configuration
```

## Key Features Explained

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Persist across sessions (database-backed)
- Real-time total calculation

### Checkout Process
1. Customer fills shipping information
2. Can apply promo codes for discounts
3. Shipping fee: $25 (free over $500)
4. Paystack payment modal opens
5. On successful payment:
   - Order status updated to "processing"
   - Payment status marked as "paid"
   - Stock automatically reduced
   - Inventory logs created
   - Cart cleared

### Admin Dashboard
- View total revenue from paid orders
- Monitor order count and customer base
- Low stock alerts for products
- Recent orders list
- Quick access to product management

### Inventory System
- Automatic stock reduction on paid orders
- Low stock threshold alerts
- Detailed inventory activity logs
- Track stock movements with references

### Promo Code System
- Percentage or fixed amount discounts
- Minimum purchase requirements
- Usage limits and tracking
- Date-based activation periods

## Security Features

All tables have Row Level Security enabled:
- Customers can only access their own data
- Admins have full access to manage the system
- Products and categories are publicly readable
- Cart and wishlist require authentication
- Orders require ownership or admin access

## Payment Flow

1. Customer completes checkout form
2. Order created with "pending" payment status
3. Paystack payment modal opens
4. Customer enters card details
5. On success:
   - Payment record created
   - Order status updated
   - Stock reduced automatically
   - Inventory logs created
6. Webhook handler processes confirmation
7. Customer redirected to success page

## Webhook Configuration

The Paystack webhook Edge Function:
- Endpoint: `/functions/v1/paystack-webhook`
- Verifies payment success
- Updates order and payment status
- Reduces product stock
- Creates inventory logs
- Handles errors gracefully

## Sample Products

The system includes 12 pre-loaded furniture products:
1. Modern Leather Sofa - $999.99 (Sale)
2. Velvet Armchair - $449.99
3. Oak Coffee Table - $299.99 (Sale)
4. King Size Platform Bed - $899.99
5. Nightstand Set - $249.99 (Sale)
6. Dining Table Set - $1,299.99 (Sale)
7. Bar Stool Set - $399.99
8. Executive Office Desk - $699.99 (Sale)
9. Ergonomic Office Chair - $549.99
10. Outdoor Lounge Set - $1,599.99 (Sale)
11. Bookshelf Unit - $399.99
12. Storage Ottoman - $149.99 (Sale)

All products include:
- High-quality stock photos from Pexels
- Detailed descriptions
- Specifications (dimensions, weight, material, color)
- Realistic pricing
- Stock quantities

## Production Deployment Checklist

- [ ] Update Paystack keys to production keys
- [ ] Configure webhook URL in Paystack dashboard
- [ ] Set up SSL certificate
- [ ] Configure custom domain
- [ ] Enable Supabase production mode
- [ ] Set up email notifications
- [ ] Configure backup strategy
- [ ] Set up monitoring and logging
- [ ] Test all payment flows
- [ ] Review RLS policies

## Support & Documentation

For issues or questions:
1. Check Supabase docs: https://supabase.com/docs
2. Paystack documentation: https://paystack.com/docs
3. React documentation: https://react.dev

## License

This project is provided as-is for demonstration and educational purposes.
