import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Award,
  Clock,
} from 'lucide-react';

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Truck className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold mb-1">Free Shipping</h4>
              <p className="text-sm text-blue-100">On orders over $50</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <Shield className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold mb-1">Secure Payment</h4>
              <p className="text-sm text-blue-100">100% secure transactions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <Award className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold mb-1">Quality Guarantee</h4>
              <p className="text-sm text-blue-100">30-day money back</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Clock className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold mb-1">24/7 Support</h4>
              <p className="text-sm text-blue-100">Always here to help</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold text-white">NexusMarket</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional customer service.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>123 Commerce Street, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>support@nexusmarket.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">All Products</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">New Arrivals</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">Best Sellers</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">Trending</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">Sale Items</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">Clearance</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition-colors">Gift Cards</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Live Chat</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Affiliates</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Partnerships</a></li>
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Popular Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="/shop" className="hover:text-blue-500 transition-colors">Electronics</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Fashion</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Home & Living</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Sports</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Beauty</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Toys</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Books</a>
              <a href="/shop" className="hover:text-blue-500 transition-colors">Automotive</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Disclaimer</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Download Our App</h4>
            <p className="text-gray-400 mb-4">Shop on the go with our mobile app</p>
            <div className="space-y-3">
              <a href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="text-gray-400">We Accept:</span>
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <span className="text-gray-400">Follow Us:</span>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            <p>&copy; 2024 NexusMarket. All rights reserved. | Designed with care for the best shopping experience</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
