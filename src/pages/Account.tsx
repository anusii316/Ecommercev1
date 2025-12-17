import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Plus,
  Trash2,
  Check,
  Eye,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useOrderStore } from '../stores/orderStore';

export const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    orders,
    savedAddresses,
    paymentMethods,
    removeAddress,
    setDefaultAddress,
    removePaymentMethod,
    setDefaultPaymentMethod,
  } = useOrderStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments'>(
    'orders'
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const statusColors = {
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
              <p className="text-blue-100">{user?.email}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'orders'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Package className="w-5 h-5" />
                Order History
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'addresses'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <MapPin className="w-5 h-5" />
                Saved Addresses
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'payments'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
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
                        <p className="text-gray-600">Placed on {order.date}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.shippingAddress}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => navigate(`/product/${order.items[0].id}`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4 inline mr-2" />
                        View Products
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors">
                        Track Order
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Addresses
                  </h2>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedAddresses.map((address, index) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-6 relative hover:shadow-md transition-shadow"
                    >
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Default
                        </span>
                      )}

                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {address.label}
                      </h3>
                      <p className="text-gray-700 font-medium mb-2">
                        {address.fullName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {address.address}
                        <br />
                        {address.city}, {address.state} {address.zipCode}
                      </p>

                      <div className="mt-4 flex gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => removeAddress(address.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment Methods
                  </h2>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Payment Method
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-6 relative hover:shadow-md transition-shadow"
                    >
                      {method.isDefault && (
                        <span className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Default
                        </span>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        {method.type === 'card' ? (
                          <CreditCard className="w-8 h-8 text-gray-700" />
                        ) : (
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold">P</span>
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900">
                          {method.type === 'card' ? 'Credit Card' : 'PayPal'}
                        </h3>
                      </div>

                      {method.type === 'card' ? (
                        <>
                          <p className="text-gray-700 font-medium mb-1">
                            {method.cardNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            {method.cardHolder}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiryDate}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-600">
                          PayPal account connected
                        </p>
                      )}

                      <div className="mt-4 flex gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => setDefaultPaymentMethod(method.id)}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => removePaymentMethod(method.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
