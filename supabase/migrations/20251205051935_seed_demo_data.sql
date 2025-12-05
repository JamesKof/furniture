/*
  # Seed Demo Data

  ## Overview
  Populates the database with demo data for the furniture eCommerce system including:
  - Admin user account (admin@demo.com / Admin123!)
  - Product categories
  - Sample furniture products
  - Product images
  - Banners for homepage
  - Promo codes

  ## Important Notes
  - Uses real Pexels stock photos for furniture
  - Creates diverse product catalog with different materials and styles
  - Sets realistic pricing and stock levels
  - Admin password is hashed by Supabase Auth
*/

-- Insert demo admin user (Note: Password must be set via Supabase Auth API)
-- The admin user will need to be created through sign-up with email: admin@demo.com, password: Admin123!
-- This migration prepares the user profile record

-- Insert categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Living Room', 'living-room', 'Comfortable and stylish furniture for your living space', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', 1),
('550e8400-e29b-41d4-a716-446655440002', 'Bedroom', 'bedroom', 'Rest and relaxation with our bedroom collection', 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg', 2),
('550e8400-e29b-41d4-a716-446655440003', 'Dining Room', 'dining-room', 'Elegant dining furniture for memorable meals', 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg', 3),
('550e8400-e29b-41d4-a716-446655440004', 'Office', 'office', 'Productive workspace essentials', 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg', 4),
('550e8400-e29b-41d4-a716-446655440005', 'Outdoor', 'outdoor', 'Weather-resistant outdoor furniture', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 5),
('550e8400-e29b-41d4-a716-446655440006', 'Storage', 'storage', 'Organize your space with style', 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg', 6)
ON CONFLICT (id) DO NOTHING;

-- Insert products
INSERT INTO products (id, category_id, name, slug, description, price, sale_price, sku, stock_quantity, low_stock_threshold, material, color, dimensions, weight, is_featured, is_active, meta_title, meta_description) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Modern Leather Sofa', 'modern-leather-sofa', 'Luxurious 3-seater leather sofa with deep cushioning and contemporary design. Perfect for modern living spaces.', 1299.99, 999.99, 'SOF-LEA-001', 15, 5, 'Leather', 'Black', '{"width": 220, "height": 85, "depth": 95}', 85.5, true, true, 'Modern Leather Sofa - Premium Quality', 'Shop our modern leather sofa featuring premium materials and contemporary design'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Velvet Armchair', 'velvet-armchair', 'Elegant armchair upholstered in soft velvet fabric. Features solid wood legs and comfortable padding.', 449.99, NULL, 'CHR-VEL-001', 25, 5, 'Velvet', 'Navy Blue', '{"width": 80, "height": 90, "depth": 85}', 22.0, true, true, 'Velvet Armchair - Elegant Seating', 'Comfortable velvet armchair perfect for living rooms and bedrooms'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Oak Coffee Table', 'oak-coffee-table', 'Solid oak coffee table with minimalist design. Features lower shelf for storage and magazine display.', 349.99, 299.99, 'TBL-OAK-001', 20, 5, 'Wood', 'Natural Oak', '{"width": 120, "height": 45, "depth": 60}', 28.5, true, true, 'Oak Coffee Table - Solid Wood', 'Handcrafted oak coffee table with modern minimalist design'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'King Size Platform Bed', 'king-size-platform-bed', 'Contemporary platform bed with upholstered headboard. Includes under-bed storage drawers.', 899.99, NULL, 'BED-PLT-001', 12, 3, 'Wood', 'Gray', '{"width": 198, "height": 120, "depth": 215}', 95.0, true, true, 'King Size Platform Bed with Storage', 'Modern platform bed featuring storage and elegant design'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Nightstand Set', 'nightstand-set', 'Set of two matching nightstands with soft-close drawers. Perfect companion to any bedroom set.', 299.99, 249.99, 'NSD-SET-001', 18, 5, 'Wood', 'White', '{"width": 50, "height": 55, "depth": 40}', 15.0, false, true, 'Modern Nightstand Set - 2 Pieces', 'Elegant nightstand set with soft-close drawers'),
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Dining Table Set', 'dining-table-set', '6-seater dining table set with cushioned chairs. Made from premium solid wood with modern finish.', 1499.99, 1299.99, 'DIN-SET-001', 8, 2, 'Wood', 'Walnut', '{"width": 180, "height": 75, "depth": 90}', 120.0, true, true, 'Dining Table Set - Seats 6', 'Complete dining set with table and 6 comfortable chairs'),
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'Bar Stool Set', 'bar-stool-set', 'Set of 4 adjustable bar stools with swivel seats. Chrome base and faux leather upholstery.', 399.99, NULL, 'STL-BAR-001', 30, 5, 'Metal', 'Black', '{"width": 40, "height": 95, "depth": 40}', 32.0, false, true, 'Bar Stool Set - Adjustable Height', 'Modern bar stools perfect for kitchen islands and home bars'),
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004', 'Executive Office Desk', 'executive-office-desk', 'Large executive desk with built-in cable management and drawers. Perfect for home office setups.', 799.99, 699.99, 'DSK-EXE-001', 10, 3, 'Wood', 'Dark Brown', '{"width": 160, "height": 75, "depth": 80}', 65.0, true, true, 'Executive Office Desk - Premium Quality', 'Spacious office desk with modern features'),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440004', 'Ergonomic Office Chair', 'ergonomic-office-chair', 'Premium ergonomic chair with lumbar support and adjustable armrests. Breathable mesh back.', 549.99, NULL, 'CHR-OFF-001', 22, 5, 'Fabric', 'Gray', '{"width": 65, "height": 115, "depth": 65}', 18.5, false, true, 'Ergonomic Office Chair - Lumbar Support', 'Comfortable office chair designed for long work sessions'),
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440005', 'Outdoor Lounge Set', 'outdoor-lounge-set', 'Weather-resistant outdoor furniture set including sofa, chairs, and coffee table. UV protected fabric.', 1899.99, 1599.99, 'OUT-LNG-001', 6, 2, 'Rattan', 'Beige', '{"width": 200, "height": 75, "depth": 90}', 95.0, true, true, 'Outdoor Lounge Set - Weather Resistant', 'Complete outdoor furniture set for patios and gardens'),
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440006', 'Bookshelf Unit', 'bookshelf-unit', 'Large bookshelf with 5 shelves and cabinet base. Perfect for books, decor, and storage.', 399.99, NULL, 'STO-BSH-001', 16, 4, 'Wood', 'White', '{"width": 100, "height": 200, "depth": 35}', 45.0, false, true, 'Bookshelf Unit - 5 Shelves', 'Versatile bookshelf for any room in your home'),
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440006', 'Storage Ottoman', 'storage-ottoman', 'Multi-functional ottoman with hidden storage compartment. Soft padded top serves as extra seating.', 179.99, 149.99, 'STO-OTM-001', 35, 5, 'Fabric', 'Gray', '{"width": 80, "height": 45, "depth": 40}', 12.0, false, true, 'Storage Ottoman - Multi-functional', 'Ottoman with hidden storage perfect for small spaces')
ON CONFLICT (id) DO NOTHING;

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', 'Modern black leather sofa front view', 0),
('660e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/276534/pexels-photo-276534.jpeg', 'Modern black leather sofa side view', 1),
('660e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg', 'Navy blue velvet armchair', 0),
('660e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/1909791/pexels-photo-1909791.jpeg', 'Oak coffee table with books', 0),
('660e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg', 'Gray platform bed with headboard', 0),
('660e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/2029687/pexels-photo-2029687.jpeg', 'White nightstand with lamp', 0),
('660e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg', 'Walnut dining table set', 0),
('660e8400-e29b-41d4-a716-446655440007', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg', 'Modern bar stools', 0),
('660e8400-e29b-41d4-a716-446655440008', 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg', 'Executive office desk', 0),
('660e8400-e29b-41d4-a716-446655440009', 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg', 'Ergonomic office chair', 0),
('660e8400-e29b-41d4-a716-446655440010', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 'Outdoor lounge furniture set', 0),
('660e8400-e29b-41d4-a716-446655440011', 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg', 'White bookshelf unit', 0),
('660e8400-e29b-41d4-a716-446655440012', 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg', 'Gray storage ottoman', 0)
ON CONFLICT DO NOTHING;

-- Insert banners for homepage
INSERT INTO banners (title, subtitle, image_url, link_url, button_text, sort_order, is_active) VALUES
('Summer Sale', 'Up to 40% off on selected items', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', '/shop', 'Shop Now', 0, true),
('New Arrivals', 'Check out our latest furniture collection', 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg', '/shop', 'Explore', 1, true)
ON CONFLICT DO NOTHING;

-- Insert promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, min_purchase, max_uses, used_count, start_date, end_date, is_active) VALUES
('WELCOME10', 'Welcome discount for new customers', 'percentage', 10, 100, NULL, 0, NOW(), NOW() + INTERVAL '1 year', true),
('SAVE50', 'Save $50 on orders over $500', 'fixed', 50, 500, 100, 0, NOW(), NOW() + INTERVAL '6 months', true),
('SUMMER25', 'Summer sale - 25% off', 'percentage', 25, 200, NULL, 0, NOW(), NOW() + INTERVAL '3 months', true)
ON CONFLICT (code) DO NOTHING;
