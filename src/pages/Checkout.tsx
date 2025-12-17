import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check, CreditCard, MapPin, FileText, Loader2, DollarSign, Smartphone, Wallet } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';

interface ShippingFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface BillingFormData {
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  sameAsShipping: boolean;
}

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { savedAddresses, addOrder, paymentMethods } = useOrderStore();
  const { user } = useAuthStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [billingData, setBillingData] = useState<BillingFormData | null>(null);
  const [addressMode, setAddressMode] = useState<'saved' | 'new'>(savedAddresses.length > 0 ? 'saved' : 'new');
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<any>(null);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [useSavedPayment, setUseSavedPayment] = useState(false);
  const [selectedSavedPayment, setSelectedSavedPayment] = useState<any>(null);
  const [processingMessage, setProcessingMessage] = useState('');

  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    formState: { errors: shippingErrors },
    setValue: setShippingValue,
  } = useForm<ShippingFormData>();

  const {
    register: registerBilling,
    handleSubmit: handleBillingSubmit,
    formState: { errors: billingErrors },
    watch,
  } = useForm<BillingFormData>();

  const sameAsShipping = watch('sameAsShipping');
  const total = getTotalPrice();

  useEffect(() => {
    const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
    if (defaultAddress && savedAddresses.length > 0) {
      setSelectedSavedAddress(defaultAddress);
      setAddressMode('saved');
    }
  }, []);

  const handleAddressSelect = (address: any) => {
    setSelectedSavedAddress(address);
    setAddressMode('saved');
  };

  const handleUseNewAddress = () => {
    setSelectedSavedAddress(null);
    setAddressMode('new');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleContinueShipping = () => {
    if (addressMode === 'saved') {
      if (!selectedSavedAddress) {
        alert('Please select a saved address');
        return;
      }
      const savedShippingData: ShippingFormData = {
        fullName: selectedSavedAddress.fullName,
        email: user?.email || '',
        address: selectedSavedAddress.address,
        city: selectedSavedAddress.city,
        state: selectedSavedAddress.state,
        zipCode: selectedSavedAddress.zipCode,
        phone: '',
      };
      setShippingData(savedShippingData);
      setStep(2);
    }
  };

  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(2);
  };

  const onBillingSubmit = (data: BillingFormData) => {
    setBillingData(data);
    setStep(3);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'upi') {
      if (useSavedPayment && selectedSavedPayment) {
      } else if (!upiId.trim()) {
        alert('Please enter your UPI ID');
        return;
      }
    }

    if (paymentMethod === 'card') {
      if (useSavedPayment && selectedSavedPayment) {
      } else if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim() || !cardName.trim()) {
        alert('Please fill in all card details');
        return;
      }
    }

    setIsProcessing(true);

    if (paymentMethod === 'upi') {
      setProcessingMessage('Processing UPI payment...');
    } else if (paymentMethod === 'card') {
      setProcessingMessage('Processing card payment...');
    } else if (paymentMethod === 'cod') {
      setProcessingMessage('Placing your order...');
    }

    const processingDelay = paymentMethod === 'upi' ? 2500 : paymentMethod === 'card' ? 2000 : 1000;

    setTimeout(() => {
      const orderNumber = `NX${Date.now().toString().slice(-8)}`;
      const orderDate = new Date().toISOString().split('T')[0];

      const shippingAddressStr = shippingData
        ? `${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.zipCode}`
        : 'Address not provided';

      const newOrder = {
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        orderNumber,
        date: orderDate,
        total: total * 1.18,
        status: 'Processing' as const,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: shippingAddressStr,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending (COD)' : 'Paid (Mock)',
      };

      addOrder(newOrder);
      clearCart();

      navigate(`/dashboard/orders/${newOrder.id}`);
    }, processingDelay);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Checkout
        </motion.h1>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className="w-24 h-1 bg-gray-300 mx-2">
              <div
                className={`h-full transition-all duration-300 ${
                  step >= 2 ? 'bg-blue-600 w-full' : 'w-0'
                }`}
              />
            </div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <div className="w-24 h-1 bg-gray-300 mx-2">
              <div
                className={`h-full transition-all duration-300 ${
                  step >= 3 ? 'bg-blue-600 w-full' : 'w-0'
                }`}
              />
            </div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-lg shadow-md p-8"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Shipping Information
                    </h2>
                  </div>

                  {savedAddresses.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Choose Address Option
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <button
                          type="button"
                          onClick={() => {
                            setAddressMode('saved');
                            const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
                            if (defaultAddress) {
                              setSelectedSavedAddress(defaultAddress);
                            }
                          }}
                          className={`p-6 border-3 rounded-xl text-left transition-all ${
                            addressMode === 'saved'
                              ? 'border-blue-600 bg-blue-50 shadow-lg'
                              : 'border-gray-300 hover:border-blue-400 hover:shadow-md bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-lg ${
                                addressMode === 'saved' ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <MapPin className={`w-6 h-6 ${
                                  addressMode === 'saved' ? 'text-blue-600' : 'text-gray-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                  Use Saved Address
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {savedAddresses.length} {savedAddresses.length === 1 ? 'address' : 'addresses'} available
                                </p>
                              </div>
                            </div>
                            {addressMode === 'saved' && (
                              <Check className="w-7 h-7 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Select from your previously saved addresses for faster checkout
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={handleUseNewAddress}
                          className={`p-6 border-3 rounded-xl text-left transition-all ${
                            addressMode === 'new'
                              ? 'border-blue-600 bg-blue-50 shadow-lg'
                              : 'border-gray-300 hover:border-blue-400 hover:shadow-md bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-lg ${
                                addressMode === 'new' ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <FileText className={`w-6 h-6 ${
                                  addressMode === 'new' ? 'text-blue-600' : 'text-gray-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                  Enter New Address
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Add a different address
                                </p>
                              </div>
                            </div>
                            {addressMode === 'new' && (
                              <Check className="w-7 h-7 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Fill in the form below to use a new shipping address
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {savedAddresses.length > 0 && addressMode === 'saved' && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Select a Saved Address
                      </h3>
                      <div className="grid grid-cols-1 gap-3 mb-6">
                        {savedAddresses.map((address) => (
                          <button
                            key={address.id}
                            type="button"
                            onClick={() => handleAddressSelect(address)}
                            className={`p-5 border-2 rounded-lg text-left transition-all ${
                              selectedSavedAddress?.id === address.id
                                ? 'border-blue-600 bg-blue-50 shadow-md'
                                : 'border-gray-300 hover:border-blue-400 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-gray-900 text-lg">
                                    {address.label}
                                  </span>
                                  {address.isDefault && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-700 font-medium mb-1">{address.fullName}</p>
                                <p className="text-sm text-gray-600">
                                  {address.address}, {address.city}, {address.state} {address.zipCode}
                                </p>
                              </div>
                              {selectedSavedAddress?.id === address.id && (
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full flex-shrink-0">
                                  <Check className="w-5 h-5 text-white" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleContinueShipping}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                      >
                        Continue to Billing
                      </button>
                    </div>
                  )}

                  {addressMode === 'new' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Enter New Shipping Address
                      </h3>
                      <form onSubmit={handleShippingSubmit(onShippingSubmit)} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                        <input
                          {...registerShipping('fullName', { required: 'Full name is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {shippingErrors.fullName && (
                          <p className="text-red-500 text-sm mt-1">
                            {shippingErrors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          {...registerShipping('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {shippingErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {shippingErrors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          {...registerShipping('address', { required: 'Address is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {shippingErrors.address && (
                          <p className="text-red-500 text-sm mt-1">
                            {shippingErrors.address.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            {...registerShipping('city', { required: 'City is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {shippingErrors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {shippingErrors.city.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <input
                            {...registerShipping('state', { required: 'State is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {shippingErrors.state && (
                            <p className="text-red-500 text-sm mt-1">
                              {shippingErrors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            {...registerShipping('zipCode', {
                              required: 'PIN code is required',
                              pattern: {
                                value: /^\d{6}$/,
                                message: 'Invalid PIN code',
                              },
                            })}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {shippingErrors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {shippingErrors.zipCode.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            {...registerShipping('phone', { required: 'Phone number is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {shippingErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {shippingErrors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                        >
                          Continue to Billing
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-lg shadow-md p-8"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Billing Information
                    </h2>
                  </div>

                  <form onSubmit={handleBillingSubmit(onBillingSubmit)} className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...registerBilling('sameAsShipping')}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Billing address is the same as shipping address
                        </span>
                      </label>
                    </div>

                    {!sameAsShipping && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Billing Address *
                          </label>
                          <input
                            {...registerBilling('billingAddress', {
                              required: !sameAsShipping && 'Billing address is required'
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {billingErrors.billingAddress && (
                            <p className="text-red-500 text-sm mt-1">
                              {billingErrors.billingAddress.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City *
                            </label>
                            <input
                              {...registerBilling('billingCity', {
                                required: !sameAsShipping && 'City is required'
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {billingErrors.billingCity && (
                              <p className="text-red-500 text-sm mt-1">
                                {billingErrors.billingCity.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State *
                            </label>
                            <input
                              {...registerBilling('billingState', {
                                required: !sameAsShipping && 'State is required'
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {billingErrors.billingState && (
                              <p className="text-red-500 text-sm mt-1">
                                {billingErrors.billingState.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            {...registerBilling('billingZipCode', {
                              required: !sameAsShipping && 'PIN code is required',
                              pattern: {
                                value: /^\d{6}$/,
                                message: 'Invalid PIN code',
                              },
                            })}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {billingErrors.billingZipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {billingErrors.billingZipCode.message}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-lg shadow-md p-8"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Order Review
                    </h2>
                  </div>

                  {shippingData && (
                    <div className="mb-6 pb-6 border-b">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Shipping Address
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-gray-900">{shippingData.fullName}</p>
                        <p className="text-gray-600">{shippingData.address}</p>
                        <p className="text-gray-600">
                          {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                        </p>
                        <p className="text-gray-600">{shippingData.phone}</p>
                        <p className="text-gray-600">{shippingData.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Method
                    </h3>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-amber-800 font-medium">
                        This is a demo checkout. Payment will be simulated.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentMethod('upi');
                            const savedUpi = paymentMethods.find(pm => pm.type === 'upi' && pm.upiId);
                            if (savedUpi) {
                              setUseSavedPayment(true);
                              setSelectedSavedPayment(savedUpi);
                              setUpiId(savedUpi.upiId || '');
                            } else {
                              setUseSavedPayment(false);
                              setSelectedSavedPayment(null);
                              setUpiId('');
                            }
                          }}
                          className={`w-full p-6 border-2 rounded-lg text-left transition-all ${
                            paymentMethod === 'upi'
                              ? 'border-blue-600 bg-blue-50 shadow-md'
                              : 'border-gray-300 hover:border-blue-400 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Smartphone className="w-6 h-6 text-blue-600" />
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  UPI Payment
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Google Pay / PhonePe / Paytm
                                </p>
                              </div>
                            </div>
                            {paymentMethod === 'upi' && (
                              <Check className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                        </button>

                        {paymentMethod === 'upi' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-5 bg-blue-50 border-2 border-blue-200 rounded-lg"
                          >
                            {paymentMethods.filter(pm => pm.type === 'upi' && pm.upiId).length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Saved UPI IDs</h4>
                                <div className="space-y-2 mb-4">
                                  {paymentMethods.filter(pm => pm.type === 'upi' && pm.upiId).map((pm) => (
                                    <button
                                      key={pm.id}
                                      type="button"
                                      onClick={() => {
                                        setUseSavedPayment(true);
                                        setSelectedSavedPayment(pm);
                                        setUpiId(pm.upiId || '');
                                      }}
                                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                                        selectedSavedPayment?.id === pm.id
                                          ? 'border-blue-600 bg-white shadow-md'
                                          : 'border-gray-300 hover:border-blue-400 bg-white'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-xs">UPI</span>
                                          </div>
                                          <div>
                                            <p className="font-medium text-gray-900">{pm.upiId}</p>
                                          </div>
                                        </div>
                                        {selectedSavedPayment?.id === pm.id && (
                                          <Check className="w-5 h-5 text-blue-600" />
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUseSavedPayment(false);
                                    setSelectedSavedPayment(null);
                                    setUpiId('');
                                  }}
                                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                  + Use a different UPI ID
                                </button>
                              </div>
                            )}

                            {(!useSavedPayment || paymentMethods.filter(pm => pm.type === 'upi' && pm.upiId).length === 0) && (
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  UPI ID *
                                </label>
                                <input
                                  type="text"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  placeholder="yourname@paytm"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            )}

                            <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                              <p className="text-sm text-blue-900">
                                You will be redirected to your UPI app to complete payment.
                                <br />
                                <span className="font-semibold">(This is a demo checkout. Payment will be simulated.)</span>
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentMethod('card');
                            const savedCard = paymentMethods.find(pm => pm.type === 'card');
                            if (savedCard) {
                              setUseSavedPayment(true);
                              setSelectedSavedPayment(savedCard);
                            } else {
                              setUseSavedPayment(false);
                              setSelectedSavedPayment(null);
                            }
                          }}
                          className={`w-full p-6 border-2 rounded-lg text-left transition-all ${
                            paymentMethod === 'card'
                              ? 'border-blue-600 bg-blue-50 shadow-md'
                              : 'border-gray-300 hover:border-blue-400 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-6 h-6 text-blue-600" />
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  Credit / Debit Card
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Visa, Mastercard, RuPay
                                </p>
                              </div>
                            </div>
                            {paymentMethod === 'card' && (
                              <Check className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                        </button>

                        {paymentMethod === 'card' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-5 bg-blue-50 border-2 border-blue-200 rounded-lg"
                          >
                            {paymentMethods.filter(pm => pm.type === 'card').length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Saved Cards</h4>
                                <div className="space-y-2 mb-4">
                                  {paymentMethods.filter(pm => pm.type === 'card').map((pm) => (
                                    <button
                                      key={pm.id}
                                      type="button"
                                      onClick={() => {
                                        setUseSavedPayment(true);
                                        setSelectedSavedPayment(pm);
                                      }}
                                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                                        selectedSavedPayment?.id === pm.id
                                          ? 'border-blue-600 bg-white shadow-md'
                                          : 'border-gray-300 hover:border-blue-400 bg-white'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <CreditCard className="w-5 h-5 text-gray-600" />
                                          <div>
                                            <p className="font-medium text-gray-900">{pm.cardNumber}</p>
                                            <p className="text-xs text-gray-500">{pm.cardHolder}</p>
                                          </div>
                                        </div>
                                        {selectedSavedPayment?.id === pm.id && (
                                          <Check className="w-5 h-5 text-blue-600" />
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUseSavedPayment(false);
                                    setSelectedSavedPayment(null);
                                  }}
                                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                  + Use a different card
                                </button>
                              </div>
                            )}

                            {!useSavedPayment && (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Number *
                                  </label>
                                  <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/\D/g, '');
                                      if (value.length <= 16) {
                                        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                                        setCardNumber(formatted);
                                      }
                                    }}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Expiry Date *
                                    </label>
                                    <input
                                      type="text"
                                      value={cardExpiry}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 4) {
                                          const formatted = value.length >= 2
                                            ? `${value.slice(0, 2)}/${value.slice(2)}`
                                            : value;
                                          setCardExpiry(formatted);
                                        }
                                      }}
                                      placeholder="MM/YY"
                                      maxLength={5}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      CVV *
                                    </label>
                                    <input
                                      type="text"
                                      value={cardCvv}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 3) {
                                          setCardCvv(value);
                                        }
                                      }}
                                      placeholder="123"
                                      maxLength={3}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name on Card *
                                  </label>
                                  <input
                                    type="text"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('cod');
                          setUseSavedPayment(false);
                          setSelectedSavedPayment(null);
                        }}
                        className={`w-full p-6 border-2 rounded-lg text-left transition-all ${
                          paymentMethod === 'cod'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 hover:border-green-400 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Wallet className="w-6 h-6 text-green-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Cash on Delivery
                              </h3>
                              <p className="text-sm text-gray-600">
                                Pay when you receive your order
                              </p>
                            </div>
                          </div>
                          {paymentMethod === 'cod' && (
                            <Check className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isProcessing}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {processingMessage || 'Processing...'}
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{(total * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{(total * 1.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
