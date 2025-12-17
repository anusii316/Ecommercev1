export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
  subcategories?: Category[];
}

export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600',
    icon: '💻',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400',
        icon: '📱',
      },
      {
        id: 'laptops',
        name: 'Laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400',
        icon: '💻',
      },
      {
        id: 'tablets',
        name: 'Tablets',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400',
        icon: '📲',
      },
      {
        id: 'headphones',
        name: 'Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400',
        icon: '🎧',
      },
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600',
    icon: '👔',
    subcategories: [
      {
        id: 'mens',
        name: "Men's Clothing",
        image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=400',
        icon: '👔',
      },
      {
        id: 'womens',
        name: "Women's Clothing",
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400',
        icon: '👗',
      },
      {
        id: 'shoes',
        name: 'Shoes',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400',
        icon: '👟',
      },
      {
        id: 'accessories',
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400',
        icon: '👜',
      },
    ],
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600',
    icon: '🏠',
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400',
        icon: '🛋️',
      },
      {
        id: 'decor',
        name: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=400',
        icon: '🖼️',
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&h=400',
        icon: '🍳',
      },
    ],
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600',
    icon: '⚽',
    subcategories: [
      {
        id: 'fitness',
        name: 'Fitness Equipment',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400',
        icon: '🏋️',
      },
      {
        id: 'outdoor',
        name: 'Outdoor Gear',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400',
        icon: '⛺',
      },
      {
        id: 'cycling',
        name: 'Cycling',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400',
        icon: '🚴',
      },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600',
    icon: '💄',
    subcategories: [
      {
        id: 'skincare',
        name: 'Skincare',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400',
        icon: '🧴',
      },
      {
        id: 'makeup',
        name: 'Makeup',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400',
        icon: '💄',
      },
      {
        id: 'fragrance',
        name: 'Fragrance',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400',
        icon: '🌸',
      },
    ],
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=600',
    icon: '🎮',
    subcategories: [
      {
        id: 'video-games',
        name: 'Video Games',
        image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=600&h=400',
        icon: '🎮',
      },
      {
        id: 'board-games',
        name: 'Board Games',
        image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=400',
        icon: '🎲',
      },
      {
        id: 'kids-toys',
        name: 'Kids Toys',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400',
        icon: '🧸',
      },
    ],
  },
  {
    id: 'books',
    name: 'Books & Media',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600',
    icon: '📚',
    subcategories: [
      {
        id: 'fiction',
        name: 'Fiction',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400',
        icon: '📖',
      },
      {
        id: 'non-fiction',
        name: 'Non-Fiction',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400',
        icon: '📕',
      },
      {
        id: 'magazines',
        name: 'Magazines',
        image: 'https://images.unsplash.com/photo-1518416177092-ec985e4d6c14?w=600&h=400',
        icon: '📰',
      },
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600',
    icon: '🚗',
    subcategories: [
      {
        id: 'parts',
        name: 'Car Parts',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400',
        icon: '🔧',
      },
      {
        id: 'accessories-auto',
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400',
        icon: '🚙',
      },
    ],
  },
  {
    id: 'pets',
    name: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600',
    icon: '🐾',
    subcategories: [
      {
        id: 'dog-supplies',
        name: 'Dog Supplies',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400',
        icon: '🐕',
      },
      {
        id: 'cat-supplies',
        name: 'Cat Supplies',
        image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&h=400',
        icon: '🐈',
      },
    ],
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Watches',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600',
    icon: '💎',
  },
  {
    id: 'baby',
    name: 'Baby & Kids',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600',
    icon: '👶',
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600',
    icon: '💊',
  },
  {
    id: 'office',
    name: 'Office Supplies',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600',
    icon: '📎',
  },
  {
    id: 'garden',
    name: 'Garden & Outdoor',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600',
    icon: '🌱',
  },
  {
    id: 'luggage',
    name: 'Luggage & Travel',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600',
    icon: '🧳',
  },
  {
    id: 'musical',
    name: 'Musical Instruments',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600',
    icon: '🎸',
  },
  {
    id: 'art',
    name: 'Arts & Crafts',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600',
    icon: '🎨',
  },
  {
    id: 'industrial',
    name: 'Industrial & Scientific',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600',
    icon: '🏭',
  },
  {
    id: 'food',
    name: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600',
    icon: '🍔',
  },
  {
    id: 'handmade',
    name: 'Handmade & Crafts',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=600',
    icon: '✋',
  },
];
