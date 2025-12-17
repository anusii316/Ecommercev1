import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Order } from '../stores/orderStore';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export const OrderTrackingModal = ({ isOpen, onClose, order }: OrderTrackingModalProps) => {
  const getTrackingSteps = () => {
    const steps = [
      {
        label: 'Order Placed',
        description: 'Your order has been placed successfully',
        icon: Package,
        status: 'completed',
        date: order.date,
      },
      {
        label: 'Processing',
        description: 'We are preparing your order',
        icon: Clock,
        status: order.status === 'Processing' ? 'current' :
                order.status === 'Cancelled' ? 'cancelled' : 'completed',
        date: order.status !== 'Cancelled' ? order.date : null,
      },
      {
        label: 'Shipped',
        description: 'Your order is on the way',
        icon: Truck,
        status: order.status === 'Shipped' ? 'current' :
                order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'completed' :
                order.status === 'Cancelled' ? 'cancelled' : 'pending',
        date: order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? order.date : null,
      },
      {
        label: 'Out for Delivery',
        description: 'Your order is out for delivery',
        icon: MapPin,
        status: order.status === 'Out for Delivery' ? 'current' :
                order.status === 'Delivered' ? 'completed' :
                order.status === 'Cancelled' ? 'cancelled' : 'pending',
        date: order.status === 'Out for Delivery' || order.status === 'Delivered' ? order.date : null,
      },
      {
        label: 'Delivered',
        description: 'Your order has been delivered',
        icon: CheckCircle,
        status: order.status === 'Delivered' ? 'completed' :
                order.status === 'Cancelled' ? 'cancelled' : 'pending',
        date: order.status === 'Delivered' ? order.date : null,
      },
    ];

    return steps;
  };

  const trackingSteps = getTrackingSteps();

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 z-[200]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Backdrop clicked, closing modal');
            onClose();
          }}
          style={{ pointerEvents: 'auto' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-[201] w-full max-w-2xl mx-4"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ pointerEvents: 'auto' }}
          >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{order.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-500">Track your order status</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close modal clicked');
                    onClose();
                  }}
                  type="button"
                  className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className={`border-2 rounded-xl p-5 mb-6 ${
                  order.status === 'Delivered'
                    ? 'bg-green-50 border-green-200'
                    : order.status === 'Cancelled'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">Current Status</p>
                      <p className={`text-2xl font-bold ${
                        order.status === 'Delivered'
                          ? 'text-green-600'
                          : order.status === 'Cancelled'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}>{order.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
                  <div className="relative">
                    {trackingSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isLast = index === trackingSteps.length - 1;

                      return (
                        <motion.div
                          key={step.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative flex gap-4 pb-8 ${
                            step.status === 'current' ? 'bg-blue-50 -mx-4 px-4 py-3 rounded-lg' : ''
                          }`}
                        >
                          {!isLast && (
                            <div
                              className={`absolute top-12 w-1 h-full ${
                                step.status === 'completed' ? 'bg-green-500 left-5' :
                                step.status === 'current' ? 'bg-blue-500 left-5' :
                                step.status === 'cancelled' ? 'bg-red-300 left-5' : 'bg-gray-300 left-5'
                              }`}
                            />
                          )}

                          <div
                            className={`flex-shrink-0 rounded-full flex items-center justify-center ${
                              step.status === 'completed'
                                ? 'bg-green-500 text-white w-11 h-11 shadow-md'
                                : step.status === 'current'
                                ? 'bg-blue-600 text-white w-12 h-12 animate-pulse shadow-lg'
                                : step.status === 'cancelled'
                                ? 'bg-red-200 text-red-400 w-10 h-10'
                                : 'bg-gray-200 text-gray-400 w-10 h-10'
                            }`}
                          >
                            <Icon className={`${
                              step.status === 'current' ? 'w-6 h-6' : 'w-5 h-5'
                            }`} />
                          </div>

                          <div className="flex-1">
                            <h4
                              className={`mb-1 ${
                                step.status === 'current'
                                  ? 'text-gray-900 font-bold text-lg'
                                  : step.status === 'completed'
                                  ? 'text-gray-900 font-semibold'
                                  : 'text-gray-400 font-medium'
                              }`}
                            >
                              {step.label}
                              {step.status === 'current' && (
                                <span className="ml-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                                  CURRENT
                                </span>
                              )}
                            </h4>
                            <p className={`text-sm ${
                              step.status === 'current' ? 'text-gray-700 font-medium' : 'text-gray-500'
                            }`}>{step.description}</p>
                            {step.date && (
                              <p className="text-xs text-gray-400 mt-1 font-medium">{step.date}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
