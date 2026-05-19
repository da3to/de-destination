-- Run this in your Supabase SQL editor

-- Users table (extends NextAuth)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'main', 'protein', 'drink', 'extra'
  price INTEGER NOT NULL, -- in kobo (multiply by 100 for Paystack)
  description TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_phone TEXT,
  items JSONB NOT NULL,
  total INTEGER NOT NULL, -- in naira
  status TEXT DEFAULT 'pending', -- pending, paid, processing, delivered, cancelled
  paystack_reference TEXT UNIQUE,
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Anyone can view menu items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (user_email = current_user);
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Seed menu items
INSERT INTO menu_items (id, name, category, price, description) VALUES
('pounded-efo', 'Pounded yam with efo', 'main', 1500, 'A portion of pounded yam with efo'),
('pounded-egusi', 'Pounded yam with egusi', 'main', 1500, 'A portion of pounded yam with egusi'),
('amala-efo', 'Amala with efo', 'main', 1200, 'A portion of amala with efo'),
('amala-ewedu', 'Amala with ewedu and gbegiri', 'main', 700, 'A portion of amala with ewedu and gbegiri'),
('ofada-sauce', 'Ofada Sauce', 'main', 200, 'A portion of ofada sauce'),
('ofada-rice', 'Ofada Rice', 'main', 700, 'A portion of ofada rice'),
('beans', 'Beans', 'main', 300, 'A portion of beans'),
('spaghetti', 'White Spaghetti', 'main', 500, 'A portion of white spaghetti'),
('fried-rice', 'Fried Rice', 'main', 500, 'Two spoons of fried rice'),
('jollof', 'Jollof Rice', 'main', 500, 'Two spoons of jollof rice'),
('jollof-pasta', 'Jollof Pasta', 'main', 1000, 'A portion of jollof pasta'),
('white-rice', 'White Rice', 'main', 500, 'Two spoons of white rice'),
('yam-porridge', 'Yam Porridge', 'main', 700, 'A portion of yam porridge'),
('cowleg', 'Cowleg', 'protein', 500, 'A piece of cowleg'),
('ponmo', 'Ponmo', 'protein', 300, 'A piece of ponmo'),
('turkey', 'Turkey', 'protein', 5000, 'A piece of turkey'),
('plantain', 'Plantain (DoDo)', 'protein', 400, 'A spoon of fried plantain'),
('chicken2500', 'Chicken (2,500)', 'protein', 2500, 'A piece of chicken'),
('chicken1500', 'Chicken (1,500)', 'protein', 1500, 'A piece of chicken'),
('beef', 'Beef', 'protein', 250, 'A piece of beef'),
('coleslaw', 'Coleslaw', 'protein', 1200, 'A portion of coleslaw'),
('moimoi', 'Moi Moi', 'protein', 1500, 'A portion of moi moi'),
('boiled-egg', 'Boiled Egg', 'protein', 400, 'A piece of boiled egg'),
('zobo', 'Zobo', 'drink', 300, 'A bottle of zobo'),
('fayrouz', 'Fayrouz', 'drink', 700, 'A bottle of fayrouz'),
('maltina', 'Maltina', 'drink', 800, 'A can of maltina'),
('7up', '7up', 'drink', 600, 'A bottle of 7up'),
('pepsi', 'Pepsi', 'drink', 600, 'A bottle of pepsi'),
('schweppes', 'Schweppes', 'drink', 600, 'A bottle of schweppes'),
('water', 'Water', 'drink', 350, 'A bottle of water'),
('fanta', 'Fanta', 'drink', 600, 'A bottle of fanta'),
('sprite', 'Sprite', 'drink', 600, 'A bottle of sprite'),
('coke', 'Coke', 'drink', 600, 'A bottle of coke'),
('big-pack', 'Bigger Disposable Pack', 'extra', 600, 'A bigger disposable pack'),
('plastic-pack', 'Plastic Disposal Pack', 'extra', 500, 'A plastic disposal pack')
ON CONFLICT (id) DO NOTHING;
