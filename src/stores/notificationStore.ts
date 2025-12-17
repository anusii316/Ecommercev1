import { create } from 'zustand';

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
  resetUserData: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
}

const USER_NOTIFICATIONS_KEY = 'nexus-user-notifications';

const getUserNotificationsKey = (userId: string) => `${USER_NOTIFICATIONS_KEY}_${userId}`;

const loadUserNotifications = (userId: string): Notification[] => {
  try {
    const stored = localStorage.getItem(getUserNotificationsKey(userId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
  return [];
};

const saveUserNotifications = (userId: string, notifications: Notification[]) => {
  try {
    localStorage.setItem(getUserNotificationsKey(userId), JSON.stringify(notifications));
  } catch {
    //
  }
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  currentUserId: null,
  notifications: [],
  initializeUserData: (userId: string) => {
    if (get().currentUserId === userId) {
      return;
    }

    const userNotifications = loadUserNotifications(userId);
    set({
      currentUserId: userId,
      notifications: userNotifications,
    });
  },
  resetUserData: () => {
    set({
      currentUserId: null,
      notifications: [],
    });
  },
  markAsRead: (id) => {
    const updatedNotifications = get().notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    set({ notifications: updatedNotifications });
    if (get().currentUserId) {
      saveUserNotifications(get().currentUserId!, updatedNotifications);
    }
  },
  markAllAsRead: () => {
    const updatedNotifications = get().notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    set({ notifications: updatedNotifications });
    if (get().currentUserId) {
      saveUserNotifications(get().currentUserId!, updatedNotifications);
    }
  },
  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },
}));
