import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp, Eye, Download, MapPin } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { OrderTrackingModal } from '../../components/OrderTrackingModal';

export const OrderHistory = () => {
  const { orders } = useOrderStore();
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<any>(null);

  const statusColors: Record<string, string> = {
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    'Out for Delivery': 'bg-cyan-100 text-cyan-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order History</h2>
        <p className="text-gray-600">View and track all your orders</p>
      </motion.div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(order.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2">{order.date}</p>
                    <p className="text-sm text-gray-500">{order.shippingAddress}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    ₹{order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>

                {expandedOrder === order.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 ml-4" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 ml-4" />
                )}
              </div>

              <div className="flex -space-x-2">
                {order.items.map((item, idx) => (
                  <motion.img
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg border-2 border-white object-cover"
                  />
                ))}
              </div>
            </div>

            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t overflow-hidden"
                >
                  <div className="p-6 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-3 mb-6">
                      {order.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-4 bg-white p-4 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">
                              {item.name}
                            </h5>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {order.status === 'Cancelled' || !order || !order.orderNumber ? (
                        <button
                          disabled
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                        >
                          <Package className="w-5 h-5" />
                          {order.status === 'Cancelled' ? 'Order Cancelled' : 'Unavailable'}
                        </button>
                      ) : order.status === 'Delivered' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrackingOrder(order);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                        >
                          <Eye className="w-5 h-5" />
                          View Order Details
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrackingOrder(order);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                        >
                          <MapPin className="w-5 h-5" />
                          Track Order
                        </button>
                      )}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        disabled={order.status === 'Cancelled'}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
                          order.status === 'Cancelled'
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        <Download className="w-5 h-5" />
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {trackingOrder && (
        <OrderTrackingModal
          isOpen={true}
          onClose={() => setTrackingOrder(null)}
          order={trackingOrder}
        />
      )}
    </div>
  );
};
