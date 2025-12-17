import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Plus,
  Trash2,
  Check,
  X,
  ArrowRight,
  Calendar,
  ShoppingBag,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useOrderStore, SavedAddress, PaymentMethod } from '../stores/orderStore';
import { useToastStore } from '../stores/toastStore';

export const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    orders,
    savedAddresses,
    paymentMethods,
    addAddress,
    removeAddress,
    setDefaultAddress,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
  } = useOrderStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments'>(
    'orders'
  );
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [newPayment, setNewPayment] = useState({
    type: 'card' as 'card' | 'upi',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    upiId: '',
  });

  const handleAddAddress = () => {
    if (!newAddress.fullName || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.phone) {
      addToast('Please fill all fields', 'error');
      return;
    }

    const address: SavedAddress = {
      id: `addr_${Date.now()}`,
      label: newAddress.label || 'Home',
      fullName: newAddress.fullName,
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      isDefault: savedAddresses.length === 0,
    };

    addAddress(address);
    addToast('Address added successfully', 'success');
    setShowAddressModal(false);
    setNewAddress({ label: '', fullName: '', address: '', city: '', state: '', zipCode: '', phone: '' });
  };

  const handleAddPayment = () => {
    if (newPayment.type === 'card' && (!newPayment.cardNumber || !newPayment.cardHolder || !newPayment.expiryDate)) {
      addToast('Please fill all card details', 'error');
      return;
    }

    const payment: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: newPayment.type,
      cardNumber: newPayment.type === 'card' ? `•••• •••• •••• ${newPayment.cardNumber.slice(-4)}` : undefined,
      cardHolder: newPayment.type === 'card' ? newPayment.cardHolder : undefined,
      expiryDate: newPayment.type === 'card' ? newPayment.expiryDate : undefined,
      upiId: newPayment.type === 'upi' && newPayment.upiId ? newPayment.upiId : undefined,
      isDefault: paymentMethods.length === 0,
    };

    addPaymentMethod(payment);
    addToast('Payment method added successfully', 'success');
    setShowPaymentModal(false);
    setNewPayment({ type: 'card', cardNumber: '', cardHolder: '', expiryDate: '', upiId: '' });
  };

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
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                              <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                Order #{order.orderNumber}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <p className="text-sm">Placed on {order.date}</p>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <ShoppingBag className="w-4 h-4" />
                                <span className="text-sm">
                                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0 ml-4">
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

                        {order.items.length > 0 && (
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b overflow-x-auto">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <img
                                key={idx}
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-semibold text-gray-600">
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <button
                          onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                        >
                          View Order Details
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
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
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
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
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
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
                            <span className="text-white font-bold text-sm">UPI</span>
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900">
                          {method.type === 'card' ? 'Credit/Debit Card' : 'UPI'}
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
                      ) : method.type === 'upi' ? (
                        <p className="text-gray-700 font-medium">
                          {method.upiId || 'UPI account linked'}
                        </p>
                      ) : null}

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

      <AnimatePresence>
        {showAddressModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddressModal(false)}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add New Address</h3>
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Label</label>
                  <input
                    type="text"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    placeholder="Home, Work, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                  <input
                    type="text"
                    value={newAddress.fullName}
                    onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">House No., Building, Street*</label>
                  <input
                    type="text"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                    <select
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code*</label>
                    <input
                      type="text"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      maxLength={6}
                      placeholder="560001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      maxLength={10}
                      placeholder="9876543210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddAddress}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add Address
                  </button>
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPaymentModal(false)}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add Payment Method</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNewPayment({ ...newPayment, type: 'card' })}
                      className={`py-3 rounded-lg font-medium transition-colors ${
                        newPayment.type === 'card'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Card
                    </button>
                    <button
                      onClick={() => setNewPayment({ ...newPayment, type: 'upi' })}
                      className={`py-3 rounded-lg font-medium transition-colors ${
                        newPayment.type === 'upi'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      UPI
                    </button>
                  </div>
                </div>

                {newPayment.type === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number*</label>
                      <input
                        type="text"
                        value={newPayment.cardNumber}
                        onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                        maxLength={16}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name*</label>
                      <input
                        type="text"
                        value={newPayment.cardHolder}
                        onChange={(e) => setNewPayment({ ...newPayment, cardHolder: e.target.value })}
                        placeholder="Name on card"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date*</label>
                        <input
                          type="text"
                          value={newPayment.expiryDate}
                          onChange={(e) => setNewPayment({ ...newPayment, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV*</label>
                        <input
                          type="text"
                          maxLength={3}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}

                {newPayment.type === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID (optional)</label>
                    <input
                      type="text"
                      value={newPayment.upiId}
                      onChange={(e) => setNewPayment({ ...newPayment, upiId: e.target.value })}
                      placeholder="yourname@paytm"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-900">
                        You will be redirected to your UPI app to complete payment.
                        <br />
                        <span className="font-semibold">(This is a demo checkout. Payment will be simulated.)</span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddPayment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add Payment Method
                  </button>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
