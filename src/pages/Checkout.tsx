import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check, CreditCard, MapPin, FileText, Loader2, DollarSign } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [billingData, setBillingData] = useState<BillingFormData | null>(null);

  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    formState: { errors: shippingErrors },
  } = useForm<ShippingFormData>();

  const {
    register: registerBilling,
    handleSubmit: handleBillingSubmit,
    formState: { errors: billingErrors },
    watch,
  } = useForm<BillingFormData>();

  const sameAsShipping = watch('sameAsShipping');
  const total = getTotalPrice();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

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

    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 3000);
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Continue to Billing
                    </button>
                  </form>
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
                    <div className="space-y-4">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-6 border-2 rounded-lg text-left transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-6 h-6" />
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Credit / Debit Card
                              </h3>
                              <p className="text-sm text-gray-600">
                                Pay securely with your card
                              </p>
                            </div>
                          </div>
                          {paymentMethod === 'card' && (
                            <Check className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`w-full p-6 border-2 rounded-lg text-left transition-colors ${
                          paymentMethod === 'paypal'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <span className="text-xl font-bold text-blue-600">P</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">PayPal</h3>
                              <p className="text-sm text-gray-600">
                                Fast and secure checkout
                              </p>
                            </div>
                          </div>
                          {paymentMethod === 'paypal' && (
                            <Check className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
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
