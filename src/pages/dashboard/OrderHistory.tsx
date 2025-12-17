import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Calendar, DollarSign, Eye, XCircle, CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { CancelOrderModal } from '../../components/CancelOrderModal';

export const OrderHistory = () => {
  const { orders, cancelOrder } = useOrderStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<any>(null);

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

  const handleCancelOrder = () => {
    if (cancellingOrder) {
      cancelOrder(cancellingOrder.id);
      setCancellingOrder(null);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order History</h2>
        <p className="text-gray-600">View and manage all your orders</p>
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
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-sm">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <button
                  onClick={() => toggleExpand(order.id)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  View Order Details
                </button>
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
                  <div className="p-6 bg-gray-50 space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Order Items
                      </h4>
                      <div className="space-y-3">
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
                              ₹{item.price.toFixed(2)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Shipping Address
                        </h4>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-gray-700">{order.shippingAddress.street}</p>
                          <p className="text-gray-700">
                            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                            {order.shippingAddress.zipCode}
                          </p>
                          <p className="text-gray-700">{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Method
                        </h4>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">{order.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Order Summary
                      </h4>
                      <div className="bg-white p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 text-lg pt-2 border-t">
                          <span>Total</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {order.status === 'Processing' && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => setCancellingOrder(order)}
                          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 py-3 px-4 rounded-lg font-semibold transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {cancellingOrder && (
        <CancelOrderModal
          isOpen={true}
          onClose={() => setCancellingOrder(null)}
          onConfirm={handleCancelOrder}
          orderNumber={cancellingOrder.orderNumber}
        />
      )}
    </div>
  );
};
