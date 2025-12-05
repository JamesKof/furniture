# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Create Admin Account
1. Click the "Sign In" button in the header
2. Click "Create one" to register
3. Use these credentials:
   - Email: `admin@demo.com`
   - Password: `Admin123!`
4. You now have admin access!

### Step 2: Browse as Customer
- View the homepage with featured products
- Click "Shop" to see all products
- Use filters to find specific furniture
- Click any product to see details
- Add items to wishlist (heart icon)
- Add items to cart

### Step 3: Test Checkout
1. Add products to your cart
2. Click the cart icon to review items
3. Click "Proceed to Checkout"
4. Fill in shipping information
5. Try promo code: `WELCOME10` for 10% off
6. Click "Pay with Paystack" (test mode)
7. View your order in "My Account" → "Orders"

## Admin Features

Access admin panel:
1. Sign in as admin (admin@demo.com)
2. Click "Admin" in navigation
3. View dashboard with:
   - Total revenue
   - Order count
   - Low stock alerts
   - Recent orders

## Test Data Included

### 12 Furniture Products Across 6 Categories:
- Living Room (sofa, armchair, coffee table)
- Bedroom (bed, nightstands)
- Dining Room (dining set, bar stools)
- Office (desk, chair)
- Outdoor (lounge set)
- Storage (bookshelf, ottoman)

### 3 Promo Codes:
- `WELCOME10` - 10% off orders over $100
- `SAVE50` - $50 off orders over $500
- `SUMMER25` - 25% off orders over $200

## Key Pages

| Page | URL Pattern | Description |
|------|-------------|-------------|
| Home | `/` | Hero banner + featured products |
| Shop | `/shop` | Product catalog with filters |
| Product | `/product/:id` | Product details + reviews |
| Cart | Sidebar | Shopping cart overlay |
| Checkout | `/checkout` | Payment & shipping |
| Wishlist | `/wishlist` | Saved favorite items |
| Orders | `/orders` | Order history |
| Account | `/account` | Customer profile |
| Admin | `/admin` | Admin dashboard |

## Features Checklist

### Customer Features
- ✅ Beautiful homepage with hero
- ✅ Product catalog with filters
- ✅ Product search and sorting
- ✅ Product detail pages
- ✅ Shopping cart
- ✅ Wishlist system
- ✅ Secure checkout
- ✅ Paystack payment integration
- ✅ Order tracking
- ✅ Customer account
- ✅ Promo code system
- ✅ Responsive design

### Admin Features
- ✅ Admin dashboard
- ✅ Revenue analytics
- ✅ Order management
- ✅ Low stock alerts
- ✅ Customer overview
- ✅ Inventory tracking

### Technical Features
- ✅ Supabase authentication
- ✅ PostgreSQL database
- ✅ Row Level Security (RLS)
- ✅ Real-time stock updates
- ✅ Paystack webhook handler
- ✅ Inventory logging
- ✅ Session persistence
- ✅ Mobile responsive

## Troubleshooting

### Can't see products?
The database has been seeded with 12 products. If you don't see them, check that you're signed in.

### Paystack payment not working?
The system is in test mode. The payment modal should open. You can close it and the order will remain pending.

### How to access admin?
1. Create account with admin@demo.com
2. The "Admin" link will appear in navigation
3. Click to access dashboard

### Cart not persisting?
Cart data is stored in the database. Make sure you're signed in for cart persistence.

## Next Steps

1. **Add More Products**: Use the admin panel structure to add products
2. **Customize Design**: Modify Tailwind classes for your brand
3. **Add Real Payments**: Update Paystack keys to production
4. **Deploy**: Ready for deployment to any hosting platform
5. **Add Features**: Email notifications, advanced search, etc.

## Support

- Check the full README.md for detailed documentation
- Review the database schema in migrations
- Explore the code structure in `/src`

Enjoy your furniture eCommerce system!
