import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Home, Package, CreditCard, Smartphone, Wallet, MapPin, Calendar, Truck, X, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const {
    orderNumber,
    paymentMethod,
    paymentStatus,
    orderStatus,
    orderDate,
    orderItems,
    shippingAddress,
    orderTotal
  } = location.state || {
    orderNumber: Math.random().toString(36).substring(2, 11).toUpperCase(),
    paymentMethod: 'card',
    paymentStatus: 'Paid (Mock)',
    orderStatus: 'Processing',
    orderDate: new Date().toISOString().split('T')[0],
    orderItems: [],
    shippingAddress: 'Address not provided',
    orderTotal: 0
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">
                    Order Date
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center">
                  {new Date(orderDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
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
                  paymentStatus === 'Pending (COD)' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {paymentStatus}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">
                  Delivery Address
                </span>
              </div>
              <p className="text-sm text-gray-900">
                {shippingAddress}
              </p>
            </div>
          </motion.div>

          {orderItems && orderItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-8"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">Order Items</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {orderItems.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t-2 border-gray-300 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-blue-600">₹{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}

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
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Navigating to Order History');
                  navigate('/dashboard/orders');
                }}
                type="button"
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <Package className="w-5 h-5" />
                View Order History
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Opening Track Order modal');
                  setShowTrackingModal(true);
                }}
                type="button"
                className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <Truck className="w-5 h-5" />
                Track Order
              </button>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Navigating to Shop');
                navigate('/shop');
              }}
              type="button"
              className="w-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showTrackingModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowTrackingModal(false);
              }}
              className="fixed inset-0 bg-black/70 z-[100]"
              style={{ pointerEvents: 'auto' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              style={{ pointerEvents: 'none' }}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                style={{ pointerEvents: 'auto' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Track Order</h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Closing tracking modal');
                      setShowTrackingModal(false);
                    }}
                    type="button"
                    className="text-gray-400 hover:text-gray-600 active:text-gray-800 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Order Number</span>
                    <span className="text-sm font-bold text-blue-600">{orderNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className="text-sm font-bold text-blue-600">{orderStatus}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-10 left-5 w-0.5 h-16 bg-green-600"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-900 mb-1">Order Confirmed</h4>
                    <p className="text-sm text-gray-600 mb-2">{new Date(orderDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <p className="text-sm text-gray-500">Your order has been placed successfully</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute top-10 left-5 w-0.5 h-16 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-900 mb-1">Processing</h4>
                    <p className="text-sm text-gray-600 mb-2">In progress</p>
                    <p className="text-sm text-gray-500">We're preparing your items for shipment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="absolute top-10 left-5 w-0.5 h-16 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-400 mb-1">Shipped</h4>
                    <p className="text-sm text-gray-500 mb-2">Pending</p>
                    <p className="text-sm text-gray-400">Your order will be shipped soon</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="absolute top-10 left-5 w-0.5 h-16 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-400 mb-1">Out for Delivery</h4>
                    <p className="text-sm text-gray-500 mb-2">Pending</p>
                    <p className="text-sm text-gray-400">Your order is on its way to you</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Home className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-400 mb-1">Delivered</h4>
                    <p className="text-sm text-gray-500 mb-2">Pending</p>
                    <p className="text-sm text-gray-400">Expected within 3-5 business days</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> This is a demo tracking timeline. Updates will be shown here as your order progresses.
                </p>
              </div>

                <div className="mt-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Closing tracking modal');
                      setShowTrackingModal(false);
                    }}
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
