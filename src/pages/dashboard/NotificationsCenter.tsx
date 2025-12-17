import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Bell,
  Check,
  CheckCheck,
} from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';

const iconMap = {
  order: Package,
  shipping: Truck,
  delivered: CheckCircle,
  alert: AlertCircle,
};

export const NotificationsCenter = () => {
  const { notifications, markAsRead, markAllAsRead, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead === b.isRead) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.isRead ? 1 : -1;
  });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <CheckCheck className="w-5 h-5" />
            Mark All as Read
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        {sortedNotifications.map((notification, index) => {
          const Icon = iconMap[notification.type];

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl shadow-md p-6 transition-all ${
                !notification.isRead ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    notification.type === 'order'
                      ? 'bg-blue-100 text-blue-600'
                      : notification.type === 'shipping'
                      ? 'bg-orange-100 text-orange-600'
                      : notification.type === 'delivered'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className={`font-semibold ${
                        notification.isRead ? 'text-gray-900' : 'text-gray-900 font-bold'
                      }`}
                    >
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-3">{notification.message}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{notification.date}</span>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-12 text-center"
        >
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-600">
            We'll notify you when something important happens
          </p>
        </motion.div>
      )}
    </div>
  );
};
