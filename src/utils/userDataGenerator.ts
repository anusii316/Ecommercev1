export const hashEmail = (email: string): string => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

export const getUserId = (email: string): string => {
  return `user_${hashEmail(email)}`;
};

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop',
];

const productNames = [
  'Premium Wireless Headphones',
  'Ultra HD Smart TV 65"',
  'Gaming Laptop Pro',
  'Modern Minimalist Watch',
  'Luxury Handbag Designer',
  'Smart Home Hub Advanced',
  'Premium Sneakers Limited',
  'Wireless Earbuds Pro Max',
  'Ergonomic Office Chair',
  'Designer Sunglasses Elite',
  'Robot Vacuum Cleaner Smart',
  'Mechanical Keyboard RGB Pro',
  'Yoga Mat Premium Extra',
  'Coffee Maker Deluxe Auto',
  'Backpack Travel Pro XL',
  'Smart Doorbell Camera HD',
  'Portable Speaker Waterproof',
  'Standing Desk Electric Pro',
  'Wireless Gaming Mouse RGB',
  'Air Purifier HEPA Ultra',
  'Running Shoes Pro Elite',
  'Instant Pot Multi-Cooker',
  'Fitness Tracker Smart Band',
  'Portable Charger 20000mAh',
  'Electric Toothbrush Sonic',
];

const addresses = [
  { street: '23, MG Road', city: 'Bengaluru', state: 'Karnataka', zip: '560001' },
  { street: '45, Anna Salai', city: 'Chennai', state: 'Tamil Nadu', zip: '600002' },
  { street: '67, Linking Road', city: 'Mumbai', state: 'Maharashtra', zip: '400050' },
  { street: '89, Park Street', city: 'Kolkata', state: 'West Bengal', zip: '700016' },
  { street: '12, Connaught Place', city: 'New Delhi', state: 'Delhi', zip: '110001' },
  { street: '34, CG Road', city: 'Ahmedabad', state: 'Gujarat', zip: '380009' },
];

const statuses: Array<'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'> = [
  'Delivered',
  'Delivered',
  'Delivered',
  'Delivered',
  'Delivered',
  'Delivered',
  'Delivered',
  'Delivered',
  'Shipped',
  'Processing',
  'Cancelled',
];

export const generateUserOrders = (userId: string) => {
  const seed = parseInt(hashEmail(userId), 36);
  const orderCount = 10 + Math.floor(seededRandom(seed) * 16);
  const orders = [];

  for (let i = 0; i < orderCount; i++) {
    const itemSeed = seed + i * 1000;
    const itemCount = 1 + Math.floor(seededRandom(itemSeed) * 3);
    const items = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const productSeed = itemSeed + j * 100;
      const productIndex = Math.floor(seededRandom(productSeed) * productNames.length);
      const price = (49.99 + seededRandom(productSeed + 1) * 1850) * 83;
      const quantity = 1 + Math.floor(seededRandom(productSeed + 2) * 2);

      items.push({
        id: `${userId}_item_${i}_${j}`,
        name: productNames[productIndex],
        price: Math.round(price * 100) / 100,
        quantity,
        image: productImages[productIndex % productImages.length],
      });

      total += items[items.length - 1].price * quantity;
    }

    const daysAgo = Math.floor(seededRandom(itemSeed + 50) * 180);
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - daysAgo);

    const addressIndex = Math.floor(seededRandom(itemSeed + 100) * addresses.length);
    const address = addresses[addressIndex];
    const statusIndex = Math.floor(seededRandom(itemSeed + 200) * statuses.length);

    orders.push({
      id: `${userId}_order_${i}`,
      orderNumber: `NX${(seed + i).toString().padStart(7, '0')}`,
      date: orderDate.toISOString().split('T')[0],
      total: Math.round(total * 100) / 100,
      status: statuses[statusIndex],
      items,
      shippingAddress: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zip,
        country: 'India',
      },
    });
  }

  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateUserAddresses = (userId: string, userName: string) => {
  const seed = parseInt(hashEmail(userId), 36);
  const addressCount = 1 + Math.floor(seededRandom(seed + 5000) * 3);
  const userAddresses = [];

  for (let i = 0; i < addressCount; i++) {
    const addressSeed = seed + 5000 + i * 100;
    const addressIndex = Math.floor(seededRandom(addressSeed) * addresses.length);
    const address = addresses[addressIndex];
    const labels = ['Home', 'Work', 'Office', 'Vacation Home'];

    userAddresses.push({
      id: `${userId}_addr_${i}`,
      label: labels[i % labels.length],
      fullName: userName,
      address: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zip,
      isDefault: i === 0,
    });
  }

  return userAddresses;
};

export const generateUserPaymentMethods = (userId: string, userName: string) => {
  const seed = parseInt(hashEmail(userId), 36);
  const hasPaypal = seededRandom(seed + 6000) > 0.5;
  const cardLast4 = (1000 + Math.floor(seededRandom(seed + 6100) * 9000)).toString();
  const expMonth = (1 + Math.floor(seededRandom(seed + 6200) * 12)).toString().padStart(2, '0');
  const expYear = (25 + Math.floor(seededRandom(seed + 6300) * 5)).toString();

  const methods = [
    {
      id: `${userId}_pm_1`,
      type: 'card' as const,
      cardNumber: `•••• •••• •••• ${cardLast4}`,
      cardHolder: userName,
      expiryDate: `${expMonth}/${expYear}`,
      isDefault: true,
    },
  ];

  if (hasPaypal) {
    methods.push({
      id: `${userId}_pm_2`,
      type: 'paypal' as const,
      isDefault: false,
    });
  }

  return methods;
};

export const generateSpendingAnalytics = (userId: string) => {
  const seed = parseInt(hashEmail(userId), 36);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const data = [];

  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - 11 + i + 12) % 12;
    const monthSeed = seed + 7000 + i * 100;
    const baseAmount = (100 + seededRandom(monthSeed) * 1500) * 83;
    const seasonalMultiplier = monthIndex === 11 ? 1.8 : monthIndex === 10 ? 1.5 : 1;
    const amount = Math.round(baseAmount * seasonalMultiplier * 100) / 100;

    data.push({
      month: months[monthIndex],
      amount,
    });
  }

  return data;
};

export const generateUserNotifications = (userId: string) => {
  const seed = parseInt(hashEmail(userId), 36);
  const notificationCount = 3 + Math.floor(seededRandom(seed + 8000) * 8);
  const notifications = [];

  const types: Array<'order' | 'promo' | 'system'> = ['order', 'promo', 'system'];
  const orderMessages = [
    'Your order has been shipped',
    'Your order has been delivered',
    'Your order is being processed',
    'Your package is out for delivery',
  ];
  const promoMessages = [
    'Flash sale: 30% off on selected items!',
    'Exclusive offer just for you - 20% off',
    'Weekend special: Free shipping on all orders',
    'New arrivals: Check out our latest collection',
  ];
  const systemMessages = [
    'Your profile has been updated',
    'New payment method added successfully',
    'Password changed successfully',
    'Shipping address updated',
  ];

  for (let i = 0; i < notificationCount; i++) {
    const notifSeed = seed + 8000 + i * 100;
    const typeIndex = Math.floor(seededRandom(notifSeed) * types.length);
    const type = types[typeIndex];

    let message = '';
    if (type === 'order') {
      message = orderMessages[Math.floor(seededRandom(notifSeed + 1) * orderMessages.length)];
    } else if (type === 'promo') {
      message = promoMessages[Math.floor(seededRandom(notifSeed + 1) * promoMessages.length)];
    } else {
      message = systemMessages[Math.floor(seededRandom(notifSeed + 1) * systemMessages.length)];
    }

    const hoursAgo = Math.floor(seededRandom(notifSeed + 2) * 168);
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);

    notifications.push({
      id: `${userId}_notif_${i}`,
      type,
      message,
      date: date.toISOString(),
      read: seededRandom(notifSeed + 3) > 0.3,
    });
  }

  return notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
