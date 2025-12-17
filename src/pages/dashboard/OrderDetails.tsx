import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';

export const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrderStore();

  const order = getOrderById(id!);

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
        <button
          onClick={() => navigate('/dashboard/orders')}
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = 0;

  const deliverySteps = [
    {
      label: 'Order Placed',
      date: order.date,
      icon: Package,
      completed: true,
    },
    {
      label: 'Processing',
      date: order.date,
      icon: Package,
      completed: order.status !== 'Cancelled',
    },
    {
      label: 'Shipped',
      date: order.status === 'Shipped' || order.status === 'Delivered' ? order.date : null,
      icon: Truck,
      completed: order.status === 'Shipped' || order.status === 'Delivered',
    },
    {
      label: 'Delivered',
      date: order.status === 'Delivered' ? order.date : null,
      icon: CheckCircle,
      completed: order.status === 'Delivered',
    },
  ];

  return (
    <div>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/dashboard/orders')}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Orders
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Order #{order.orderNumber}
            </h2>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Delivery Status
            </h3>

            <div className="relative">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === deliverySteps.length - 1;

                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="relative flex gap-4 pb-8"
                  >
                    {!isLast && (
                      <div
                        className={`absolute left-5 top-12 w-0.5 h-full ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    )}

                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <h4
                        className={`font-semibold ${
                          step.completed ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </h4>
                      {step.date && (
                        <p className="text-sm text-gray-500">{step.date}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Order Items
            </h3>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Shipping Address
                  </p>
                  <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Order Date
                  </p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Payment Method
                  </p>
                  <p className="text-sm text-gray-600">Credit Card</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Track Order
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors">
              Download Invoice
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
