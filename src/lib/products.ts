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
  const price = Math.round((Math.random() * 200 + 20) * 100) / 100;
  const hasDiscount = Math.random() > 0.5;
  const originalPrice = hasDiscount ? Math.round(price * 1.3 * 100) / 100 : undefined;

  return {
    id: `product-${index + 1}`,
    name: productNames[index],
    price,
    originalPrice,
    category: categories[Math.floor(Math.random() * categories.length)],
    image: `https://source.unsplash.com/random/800x800?sig=${index}`,
    gallery: [
      `https://source.unsplash.com/random/800x800?sig=${index}`,
      `https://source.unsplash.com/random/800x800?sig=${index}-1`,
      `https://source.unsplash.com/random/800x800?sig=${index}-2`,
      `https://source.unsplash.com/random/800x800?sig=${index}-3`,
      `https://source.unsplash.com/random/800x800?sig=${index}-4`,
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
