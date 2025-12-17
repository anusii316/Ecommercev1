import { motion } from 'framer-motion';
import { Package, Clock, Heart, DollarSign, TrendingUp, Eye } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useNavigate } from 'react-router-dom';

export const DashboardOverview = () => {
  const { orders } = useOrderStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();

  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(
    (o) => o.status === 'Processing' || o.status === 'Shipped'
  ).length;
  const wishlistCount = wishlistItems.length;
  const totalSpent = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  const recentOrders = orders.slice(0, 5);

  const summaryCards = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Deliveries',
      value: pendingDeliveries,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Wishlist Items',
      value: wishlistCount,
      icon: Heart,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total Spent',
      value: `₹${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-600">
          Here's an overview of your account activity
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>

                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>

              <div
                className={`h-1 bg-gradient-to-r ${card.color}`}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg border-2 border-white object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    #{order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ₹{order.total.toFixed(2)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <Eye className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>

          <div className="space-y-3">
            {[
              {
                label: 'View All Orders',
                description: 'Track your order history',
                action: () => navigate('/dashboard/orders'),
                icon: Package,
                color: 'text-blue-600 bg-blue-50',
              },
              {
                label: 'Manage Wishlist',
                description: 'View saved products',
                action: () => navigate('/dashboard/wishlist'),
                icon: Heart,
                color: 'text-red-600 bg-red-50',
              },
              {
                label: 'Update Profile',
                description: 'Edit your information',
                action: () => navigate('/dashboard/profile'),
                icon: Package,
                color: 'text-green-600 bg-green-50',
              },
              {
                label: 'View Analytics',
                description: 'See spending insights',
                action: () => navigate('/dashboard/analytics'),
                icon: TrendingUp,
                color: 'text-purple-600 bg-purple-50',
              },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={action.action}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {action.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
