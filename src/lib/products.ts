export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  specs: { [key: string]: string };
  rating: number;
  reviews: any[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];

const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606510907744-6b1c1c7e0b6d?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1544451256-d79ab5fd8c17?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1624222247344-550fb60583f2?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1582053433188-0697772b3189?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1506968430-ee6f5f5ba9b4?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop',
];

const productNames = [
  'Premium Wireless Headphones',
  'Smart Fitness Watch',
  'Portable Bluetooth Speaker',
  'USB-C Charging Cable',
  'Wireless Gaming Mouse',
  'Mechanical Keyboard',
  'HD Webcam',
  '4K Action Camera',
  'Phone Stand Holder',
  'Laptop Cooling Pad',
  'Cotton T-Shirt',
  'Denim Jeans',
  'Running Shoes',
  'Winter Jacket',
  'Leather Wallet',
  'Sports Cap',
  'Canvas Backpack',
  'Sunglasses',
  'Wrist Watch',
  'Belt',
  'Coffee Maker',
  'Blender',
  'Air Purifier',
  'Desk Lamp',
  'Wall Clock',
  'Photo Frame',
  'Throw Pillow',
  'Area Rug',
  'Curtains',
  'Plant Pot',
  'Yoga Mat',
  'Dumbbell Set',
  'Jump Rope',
  'Resistance Bands',
  'Tennis Racket',
  'Basketball',
  'Soccer Ball',
  'Golf Balls',
  'Swimming Goggles',
  'Bike Helmet',
  'Mystery Novel',
  'Cookbook',
  'Travel Guide',
  'Self-Help Book',
  'Science Magazine',
  'LEGO Set',
  'Board Game',
  'Puzzle 1000pc',
  'Action Figure',
  'Stuffed Animal',
];

export const products: Product[] = Array.from({ length: 50 }, (_, index) => {
  const price = Math.round((Math.random() * 200 + 20) * 83 * 100) / 100;
  const hasDiscount = Math.random() > 0.5;
  const originalPrice = hasDiscount ? Math.round(price * 1.3 * 100) / 100 : undefined;

  const mainImage = productImages[index];
  return {
    id: `product-${index + 1}`,
    name: productNames[index],
    price,
    originalPrice,
    category: categories[Math.floor(Math.random() * categories.length)],
    image: mainImage,
    gallery: [
      mainImage,
      productImages[(index + 10) % productImages.length],
      productImages[(index + 20) % productImages.length],
      productImages[(index + 30) % productImages.length],
      productImages[(index + 40) % productImages.length],
    ],
    description: `High quality ${productNames[index].toLowerCase()} with premium features and excellent build quality. Perfect for everyday use and designed to last.`,
    specs: {},
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviews: [],
    isNew: index < 10,
    isBestSeller: index % 5 === 0,
    isTrending: index % 7 === 0,
  };
});
