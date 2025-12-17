import { create } from 'zustand';
import { generateUserNotifications } from '../utils/userDataGenerator';

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system';
  message: string;
  date: string;
  read: boolean;
}

interface NotificationState {
  currentUserId: string | null;
  notifications: Notification[];
  initializeUserData: (userId: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  currentUserId: null,
  notifications: [],
  initializeUserData: (userId: string) => {
    if (get().currentUserId === userId) {
      return;
    }

    const userNotifications = generateUserNotifications(userId);
    set({
      currentUserId: userId,
      notifications: userNotifications,
    });
  },
  markAsRead: (id) => {
    set({
      notifications: get().notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    });
  },
  markAllAsRead: () => {
    set({
      notifications: get().notifications.map((notif) => ({
        ...notif,
        read: true,
      })),
    });
  },
  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },
}));
