import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  generateUserOrders,
  generateUserAddresses,
  generateUserPaymentMethods,
} from '../utils/userDataGenerator';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface OrderState {
  currentUserId: string | null;
  orders: Order[];
  savedAddresses: SavedAddress[];
  paymentMethods: PaymentMethod[];
  initializeUserData: (userId: string, userName: string) => void;
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  addAddress: (address: SavedAddress) => void;
  updateAddress: (id: string, address: Partial<SavedAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'NX2024001',
    date: '2024-12-10',
    total: 1899.99,
    status: 'Delivered',
    items: [
      {
        id: '6',
        name: 'Gaming Laptop Pro',
        price: 1899.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '2',
    orderNumber: 'NX2024002',
    date: '2024-12-08',
    total: 549.98,
    status: 'Shipped',
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      },
      {
        id: '10',
        name: 'Wireless Earbuds Pro',
        price: 249.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '3',
    orderNumber: 'NX2024003',
    date: '2024-12-05',
    total: 599.99,
    status: 'Processing',
    items: [
      {
        id: '7',
        name: 'Luxury Handbag',
        price: 599.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: '4',
    orderNumber: 'NX2024004',
    date: '2024-12-01',
    total: 1299.99,
    status: 'Delivered',
    items: [
      {
        id: '2',
        name: 'Ultra HD Smart TV 65"',
        price: 1299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '5',
    orderNumber: 'NX2024005',
    date: '2024-11-28',
    total: 359.97,
    status: 'Delivered',
    items: [
      {
        id: '9',
        name: 'Premium Sneakers',
        price: 179.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '6',
    orderNumber: 'NX2024006',
    date: '2024-11-25',
    total: 449.99,
    status: 'Delivered',
    items: [
      {
        id: '11',
        name: 'Ergonomic Office Chair',
        price: 449.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: '7',
    orderNumber: 'NX2024007',
    date: '2024-11-20',
    total: 199.99,
    status: 'Delivered',
    items: [
      {
        id: '5',
        name: 'Modern Minimalist Watch',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '8',
    orderNumber: 'NX2024008',
    date: '2024-11-15',
    total: 149.99,
    status: 'Delivered',
    items: [
      {
        id: '8',
        name: 'Smart Home Hub',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '9',
    orderNumber: 'NX2024009',
    date: '2024-11-10',
    total: 699.98,
    status: 'Delivered',
    items: [
      {
        id: '14',
        name: 'Designer Sunglasses',
        price: 249.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop',
      },
      {
        id: '11',
        name: 'Ergonomic Office Chair',
        price: 449.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: '10',
    orderNumber: 'NX2024010',
    date: '2024-11-05',
    total: 499.99,
    status: 'Delivered',
    items: [
      {
        id: '15',
        name: 'Robot Vacuum Cleaner',
        price: 499.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '11',
    orderNumber: 'NX2024011',
    date: '2024-10-28',
    total: 159.99,
    status: 'Delivered',
    items: [
      {
        id: '16',
        name: 'Mechanical Keyboard RGB',
        price: 159.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '12',
    orderNumber: 'NX2024012',
    date: '2024-10-20',
    total: 79.99,
    status: 'Delivered',
    items: [
      {
        id: '17',
        name: 'Yoga Mat Premium',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '13',
    orderNumber: 'NX2024013',
    date: '2024-10-15',
    total: 199.99,
    status: 'Cancelled',
    items: [
      {
        id: '18',
        name: 'Coffee Maker Deluxe',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: '14',
    orderNumber: 'NX2024014',
    date: '2024-10-10',
    total: 129.99,
    status: 'Delivered',
    items: [
      {
        id: '19',
        name: 'Backpack Travel Pro',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '15',
    orderNumber: 'NX2024015',
    date: '2024-10-05',
    total: 179.99,
    status: 'Delivered',
    items: [
      {
        id: '20',
        name: 'Smart Doorbell Camera',
        price: 179.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '16',
    orderNumber: 'NX2024016',
    date: '2024-09-28',
    total: 89.99,
    status: 'Delivered',
    items: [
      {
        id: '21',
        name: 'Portable Speaker Waterproof',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '17',
    orderNumber: 'NX2024017',
    date: '2024-09-20',
    total: 599.99,
    status: 'Delivered',
    items: [
      {
        id: '22',
        name: 'Standing Desk Electric',
        price: 599.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: '18',
    orderNumber: 'NX2024018',
    date: '2024-09-15',
    total: 79.99,
    status: 'Delivered',
    items: [
      {
        id: '23',
        name: 'Wireless Gaming Mouse',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '19',
    orderNumber: 'NX2024019',
    date: '2024-09-10',
    total: 299.99,
    status: 'Delivered',
    items: [
      {
        id: '24',
        name: 'Air Purifier HEPA',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: '20',
    orderNumber: 'NX2024020',
    date: '2024-09-05',
    total: 139.99,
    status: 'Delivered',
    items: [
      {
        id: '25',
        name: 'Running Shoes Pro',
        price: 139.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
];

const mockAddresses: SavedAddress[] = [
  {
    id: '1',
    label: 'Home',
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    fullName: 'John Doe',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    isDefault: false,
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'paypal',
    isDefault: false,
  },
];

const USER_ORDERS_KEY = 'nexus-user-orders';
const USER_ADDRESSES_KEY = 'nexus-user-addresses';
const USER_PAYMENTS_KEY = 'nexus-user-payments';

const getUserOrdersKey = (userId: string) => `${USER_ORDERS_KEY}_${userId}`;
const getUserAddressesKey = (userId: string) => `${USER_ADDRESSES_KEY}_${userId}`;
const getUserPaymentsKey = (userId: string) => `${USER_PAYMENTS_KEY}_${userId}`;

const loadUserOrders = (userId: string): Order[] => {
  try {
    const stored = localStorage.getItem(getUserOrdersKey(userId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
  return [];
};

const saveUserOrders = (userId: string, orders: Order[]) => {
  try {
    localStorage.setItem(getUserOrdersKey(userId), JSON.stringify(orders));
  } catch {
    //
  }
};

const loadUserAddresses = (userId: string): SavedAddress[] => {
  try {
    const stored = localStorage.getItem(getUserAddressesKey(userId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
  return [];
};

const saveUserAddresses = (userId: string, addresses: SavedAddress[]) => {
  try {
    localStorage.setItem(getUserAddressesKey(userId), JSON.stringify(addresses));
  } catch {
    //
  }
};

const loadUserPayments = (userId: string): PaymentMethod[] => {
  try {
    const stored = localStorage.getItem(getUserPaymentsKey(userId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
  return [];
};

const saveUserPayments = (userId: string, payments: PaymentMethod[]) => {
  try {
    localStorage.setItem(getUserPaymentsKey(userId), JSON.stringify(payments));
  } catch {
    //
  }
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      currentUserId: null,
      orders: mockOrders,
      savedAddresses: mockAddresses,
      paymentMethods: mockPaymentMethods,
      initializeUserData: (userId: string, userName: string) => {
        if (get().currentUserId === userId) {
          return;
        }

        const userOrders = loadUserOrders(userId);
        const userAddresses = loadUserAddresses(userId);
        const userPayments = loadUserPayments(userId);

        set({
          currentUserId: userId,
          orders: userOrders,
          savedAddresses: userAddresses,
          paymentMethods: userPayments,
        });
      },
      addOrder: (order) => {
        const newOrders = [order, ...get().orders];
        set({ orders: newOrders });
        if (get().currentUserId) {
          saveUserOrders(get().currentUserId!, newOrders);
        }
      },
      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },
      addAddress: (address) => {
        const newAddresses = [...get().savedAddresses, address];
        set({ savedAddresses: newAddresses });
        if (get().currentUserId) {
          saveUserAddresses(get().currentUserId!, newAddresses);
        }
      },
      updateAddress: (id, updatedAddress) => {
        const newAddresses = get().savedAddresses.map((addr) =>
          addr.id === id ? { ...addr, ...updatedAddress } : addr
        );
        set({ savedAddresses: newAddresses });
        if (get().currentUserId) {
          saveUserAddresses(get().currentUserId!, newAddresses);
        }
      },
      removeAddress: (id) => {
        const newAddresses = get().savedAddresses.filter((addr) => addr.id !== id);
        set({ savedAddresses: newAddresses });
        if (get().currentUserId) {
          saveUserAddresses(get().currentUserId!, newAddresses);
        }
      },
      setDefaultAddress: (id) => {
        const newAddresses = get().savedAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }));
        set({ savedAddresses: newAddresses });
        if (get().currentUserId) {
          saveUserAddresses(get().currentUserId!, newAddresses);
        }
      },
      addPaymentMethod: (method) => {
        const newPayments = [...get().paymentMethods, method];
        set({ paymentMethods: newPayments });
        if (get().currentUserId) {
          saveUserPayments(get().currentUserId!, newPayments);
        }
      },
      removePaymentMethod: (id) => {
        const newPayments = get().paymentMethods.filter((pm) => pm.id !== id);
        set({ paymentMethods: newPayments });
        if (get().currentUserId) {
          saveUserPayments(get().currentUserId!, newPayments);
        }
      },
      setDefaultPaymentMethod: (id) => {
        const newPayments = get().paymentMethods.map((pm) => ({
          ...pm,
          isDefault: pm.id === id,
        }));
        set({ paymentMethods: newPayments });
        if (get().currentUserId) {
          saveUserPayments(get().currentUserId!, newPayments);
        }
      },
    }),
    {
      name: 'nexus-order-storage',
    }
  )
);
