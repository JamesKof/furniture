/*
  # Fix Security and Performance Issues
  
  1. Performance Improvements
    - Add missing indexes for all foreign key columns
    - Optimize RLS policies by wrapping auth.uid() with (select auth.uid())
    - Set search_path for functions to prevent security issues
    
  2. Index Creation
    - addresses.user_id
    - cart_items.product_id, cart_items.variant_id
    - categories.parent_id
    - inventory_logs.created_by, inventory_logs.variant_id
    - order_items.product_id, order_items.variant_id
    - reviews.user_id
    - wishlist.product_id
    
  3. RLS Policy Optimization
    - Replace all auth.uid() calls with (select auth.uid())
    - This prevents function re-evaluation for each row and improves performance at scale
    
  4. Function Security
    - Set search_path for all functions to prevent injection attacks
    
  5. Policy Consolidation
    - Merge duplicate SELECT policies where possible to fix "Multiple Permissive Policies" warnings
*/

-- =====================================================
-- PART 1: ADD MISSING INDEXES FOR FOREIGN KEYS
-- =====================================================

-- Addresses table
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);

-- Cart items table
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_variant_id ON cart_items(variant_id);

-- Categories table
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);

-- Inventory logs table
CREATE INDEX IF NOT EXISTS idx_inventory_logs_created_by ON inventory_logs(created_by);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_variant_id ON inventory_logs(variant_id);

-- Order items table
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_variant_id ON order_items(variant_id);

-- Reviews table
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- Wishlist table
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);

-- =====================================================
-- PART 2: OPTIMIZE RLS POLICIES
-- =====================================================

-- Users table policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (
    ((select auth.uid()) = id) OR 
    (EXISTS (SELECT 1 FROM users users_1 WHERE users_1.id = (select auth.uid()) AND users_1.role = 'admin'))
  );

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Admins can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users users_1 WHERE users_1.id = (select auth.uid()) AND users_1.role = 'admin'));

-- Categories policies - consolidate and optimize
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Products policies - consolidate and optimize
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Anyone can view active products" ON products;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (
    (is_active = true) OR 
    (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'))
  );

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Product images policies - consolidate and optimize
DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;
DROP POLICY IF EXISTS "Anyone can view product images" ON product_images;

CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage product images"
  ON product_images FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Product variants policies - consolidate and optimize
DROP POLICY IF EXISTS "Admins can manage product variants" ON product_variants;
DROP POLICY IF EXISTS "Anyone can view product variants" ON product_variants;

CREATE POLICY "Anyone can view product variants"
  ON product_variants FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage product variants"
  ON product_variants FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Cart policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own cart" ON cart;
DROP POLICY IF EXISTS "Users can manage own cart" ON cart;

CREATE POLICY "Users can manage own cart"
  ON cart FOR ALL
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Cart items policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can manage own cart items" ON cart_items;

CREATE POLICY "Users can manage own cart items"
  ON cart_items FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM cart WHERE cart.id = cart_items.cart_id AND cart.user_id = (select auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM cart WHERE cart.id = cart_items.cart_id AND cart.user_id = (select auth.uid())));

-- Wishlist policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlist;
DROP POLICY IF EXISTS "Users can manage own wishlist" ON wishlist;

CREATE POLICY "Users can manage own wishlist"
  ON wishlist FOR ALL
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Addresses policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can manage own addresses" ON addresses;

CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Orders policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Admins can manage all orders" ON orders;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    ((select auth.uid()) = user_id) OR 
    (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'))
  );

CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Order items policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage order items" ON order_items;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (
        orders.user_id = (select auth.uid()) OR 
        EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin')
      )
    )
  );

CREATE POLICY "Admins can manage order items"
  ON order_items FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Payments policies - consolidate and optimize
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
DROP POLICY IF EXISTS "Admins can manage payments" ON payments;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND (
        orders.user_id = (select auth.uid()) OR 
        EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin')
      )
    )
  );

CREATE POLICY "Admins can manage payments"
  ON payments FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Reviews policies - optimize
DROP POLICY IF EXISTS "Users can create reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON reviews;

CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO public
  USING (
    (is_approved = true) OR 
    (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'))
  );

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    ((select auth.uid()) = user_id) OR 
    (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'))
  );

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Promo codes policies - consolidate and optimize
DROP POLICY IF EXISTS "Admins can manage promo codes" ON promo_codes;
DROP POLICY IF EXISTS "Anyone can view active promo codes" ON promo_codes;

CREATE POLICY "Anyone can view active promo codes"
  ON promo_codes FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage promo codes"
  ON promo_codes FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Inventory logs policies - optimize
DROP POLICY IF EXISTS "Admins can view inventory logs" ON inventory_logs;
DROP POLICY IF EXISTS "Admins can create inventory logs" ON inventory_logs;

CREATE POLICY "Admins can view inventory logs"
  ON inventory_logs FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

CREATE POLICY "Admins can create inventory logs"
  ON inventory_logs FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- Banners policies - consolidate and optimize
DROP POLICY IF EXISTS "Admins can manage banners" ON banners;
DROP POLICY IF EXISTS "Anyone can view active banners" ON banners;

CREATE POLICY "Anyone can view active banners"
  ON banners FOR SELECT
  TO public
  USING (
    (is_active = true) OR 
    (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'))
  );

CREATE POLICY "Admins can manage banners"
  ON banners FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid()) AND users.role = 'admin'));

-- =====================================================
-- PART 3: FIX FUNCTION SEARCH PATH
-- =====================================================

-- Update the update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update the handle_new_user function with secure search_path
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
END;
$$;