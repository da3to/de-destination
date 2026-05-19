export interface MenuItem {
  id: string
  name: string
  price: number
  emoji: string
  note: string
  category: 'main' | 'protein' | 'drink' | 'extra'
  image?: string
}

export const menuData: Record<string, MenuItem[]> = {
  bestSellers: [
    { id: 'cowleg', name: 'Cowleg', price: 500, emoji: '🍖', note: 'Rich and tender cowleg.', category: 'protein' },
    { id: 'jollof', name: 'Jollof Rice', price: 500, emoji: '🍚', note: 'Smoky party jollof rice.', category: 'main' },
    { id: 'chicken2500', name: 'Chicken (Big)', price: 2500, emoji: '🍗', note: 'Juicy grilled chicken.', category: 'protein' },
    { id: 'pounded-efo', name: 'Pounded Yam + Efo', price: 1500, emoji: '🥣', note: 'Classic pounded yam with efo.', category: 'main' },
  ],
  main: [
    { id: 'pounded-efo', name: 'Pounded yam with efo', price: 1500, emoji: '🥣', note: 'A portion of pounded yam with efo (₦1,500)', category: 'main' },
    { id: 'pounded-egusi', name: 'Pounded yam with egusi', price: 1500, emoji: '🍲', note: 'A portion of pounded yam with egusi (₦1,500)', category: 'main' },
    { id: 'amala-efo', name: 'Amala with efo', price: 1200, emoji: '🥘', note: 'A portion of amala with efo (₦1,200)', category: 'main' },
    { id: 'amala-ewedu', name: 'Amala with ewedu and gbegiri', price: 700, emoji: '🫕', note: 'A portion of amala with ewedu and gbegiri (₦700)', category: 'main' },
    { id: 'ofada-sauce', name: 'Ofada Sauce', price: 200, emoji: '🍛', note: 'A portion of ofada sauce (₦200)', category: 'main' },
    { id: 'ofada-rice', name: 'Ofada Rice', price: 700, emoji: '🍚', note: 'A portion of ofada rice (₦700)', category: 'main' },
    { id: 'beans', name: 'Beans', price: 300, emoji: '🫘', note: 'A portion of beans (₦300)', category: 'main' },
    { id: 'spaghetti', name: 'White Spaghetti', price: 500, emoji: '🍝', note: 'A portion of white spaghetti (₦500)', category: 'main' },
    { id: 'fried-rice', name: 'Fried Rice', price: 500, emoji: '🍳', note: 'Two spoons of fried rice (₦500)', category: 'main' },
    { id: 'jollof', name: 'Jollof Rice', price: 500, emoji: '🍚', note: 'Two spoons of jollof rice (₦500)', category: 'main' },
    { id: 'jollof-pasta', name: 'Jollof Pasta', price: 1000, emoji: '🍝', note: 'A portion of jollof pasta (₦1,000)', category: 'main' },
    { id: 'white-rice', name: 'White Rice', price: 500, emoji: '🍚', note: 'Two spoons of white rice (₦500)', category: 'main' },
    { id: 'yam-porridge', name: 'Yam Porridge', price: 700, emoji: '🍲', note: 'A portion of yam porridge (₦700)', category: 'main' },
  ],
  proteins: [
    { id: 'cowleg', name: 'Cowleg', price: 500, emoji: '🦴', note: 'A piece of cowleg (₦500)', category: 'protein' },
    { id: 'ponmo', name: 'Ponmo', price: 300, emoji: '🥩', note: 'A piece of ponmo (₦300)', category: 'protein' },
    { id: 'turkey', name: 'Turkey', price: 5000, emoji: '🦃', note: 'A piece of turkey (₦5,000)', category: 'protein' },
    { id: 'plantain', name: 'Plantain (DoDo)', price: 400, emoji: '🌿', note: 'A spoon of fried plantain (₦400)', category: 'protein' },
    { id: 'chicken2500', name: 'Chicken (2,500)', price: 2500, emoji: '🍗', note: 'A piece of chicken (₦2,500)', category: 'protein' },
    { id: 'chicken1500', name: 'Chicken (1,500)', price: 1500, emoji: '🍗', note: 'A piece of chicken (₦1,500)', category: 'protein' },
    { id: 'beef', name: 'Beef', price: 250, emoji: '🥩', note: 'A piece of beef (₦250)', category: 'protein' },
    { id: 'coleslaw', name: 'Coleslaw', price: 1200, emoji: '🥗', note: 'A portion of coleslaw (₦1,200)', category: 'protein' },
    { id: 'moimoi', name: 'Moi Moi', price: 1500, emoji: '🫓', note: 'A portion of moi moi (₦1,500)', category: 'protein' },
    { id: 'boiled-egg', name: 'Boiled Egg', price: 400, emoji: '🥚', note: 'A piece of boiled egg (₦400)', category: 'protein' },
  ],
  drinks: [
    { id: 'zobo', name: 'Zobo', price: 300, emoji: '🍹', note: 'A bottle of zobo (₦300)', category: 'drink' },
    { id: 'fayrouz', name: 'Fayrouz', price: 700, emoji: '🍾', note: 'A bottle of fayrouz (₦700)', category: 'drink' },
    { id: 'maltina', name: 'Maltina', price: 800, emoji: '🥤', note: 'A can of maltina (₦800)', category: 'drink' },
    { id: '7up', name: '7up', price: 600, emoji: '🥤', note: 'A bottle of 7up (₦600)', category: 'drink' },
    { id: 'pepsi', name: 'Pepsi', price: 600, emoji: '🥤', note: 'A bottle of pepsi (₦600)', category: 'drink' },
    { id: 'schweppes', name: 'Schweppes', price: 600, emoji: '🥤', note: 'A bottle of schweppes (₦600)', category: 'drink' },
    { id: 'water', name: 'Water', price: 350, emoji: '💧', note: 'A bottle of water (₦350)', category: 'drink' },
    { id: 'fanta', name: 'Fanta', price: 600, emoji: '🟠', note: 'A bottle of fanta (₦600)', category: 'drink' },
    { id: 'sprite', name: 'Sprite', price: 600, emoji: '🟢', note: 'A bottle of sprite (₦600)', category: 'drink' },
    { id: 'coke', name: 'Coke', price: 600, emoji: '🥤', note: 'A bottle of coke (₦600)', category: 'drink' },
  ],
  extras: [
    { id: 'big-pack', name: 'Bigger Disposable Pack', price: 600, emoji: '📦', note: 'A bigger disposable pack (₦600)', category: 'extra' },
    { id: 'plastic-pack', name: 'Plastic Disposal Pack', price: 500, emoji: '🗃️', note: 'A plastic disposal pack (₦500)', category: 'extra' },
  ],
}
