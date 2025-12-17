import { motion } from 'framer-motion';
import { CheckCircle, Home, Package, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = Math.random().toString(36).substring(2, 11).toUpperCase();

  const { paymentMethod, paymentStatus, orderStatus } = location.state || {
    paymentMethod: 'card',
    paymentStatus: 'Paid (Mock)',
    orderStatus: 'Placed'
  };

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'upi':
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case 'card':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'cod':
        return <Wallet className="w-5 h-5 text-green-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'upi':
        return 'UPI Payment';
      case 'card':
        return 'Credit/Debit Card';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return 'Card Payment';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Thank you for your purchase. Your order has been successfully placed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">
                  Order Number
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getPaymentIcon()}
                  <span className="text-xs font-medium text-gray-600">
                    Payment Method
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center">
                  {getPaymentMethodName()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">
                    Payment Status
                  </span>
                </div>
                <p className={`text-sm font-semibold text-center ${
                  paymentStatus === 'Pending' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {paymentStatus}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">
                    Order Status
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-600 text-center">
                  {orderStatus}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Order Confirmation</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a confirmation email shortly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Processing</h3>
                <p className="text-gray-600 text-sm">
                  We're preparing your items for shipment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Your order will arrive within 3-5 business days
                </p>
              </div>
            </div>
          </motion.div>

          {paymentMethod === 'cod' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8"
            >
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Please keep the exact amount ready. Payment will be collected at the time of delivery.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
