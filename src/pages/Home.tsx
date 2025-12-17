import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Tag,
  Sparkles,
  Gift,
  Heart,
  Eye,
  ShoppingCart,
  Truck,
  Shield,
  Award,
} from 'lucide-react';
import { useProductsStore } from '../stores/productsStore';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { mockCategories } from '../data/mockCategories';
import { mockTestimonials, brandLogos } from '../data/mockTestimonials';

export const Home = () => {
  const navigate = useNavigate();
  const { products } = useProductsStore();
  const [categoryScroll, setCategoryScroll] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [dealTimeLeft, setDealTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    const heavyArray = Array.from({ length: 10000 }, (_, i) => i);
    const startTime = performance.now();

    heavyArray.sort((a, b) => {
      const complexCalc = Math.sin(a) * Math.cos(b) + Math.sqrt(a + b);
      return complexCalc - (Math.sin(b) * Math.cos(a) + Math.sqrt(b + a));
    });

    const endTime = performance.now();
    console.log(`Heavy computation took ${endTime - startTime}ms`);

    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      const viewedIds = JSON.parse(viewed);
      const viewedProducts = products.filter((p) => viewedIds.includes(p.id));
      setRecentlyViewed(viewedProducts);
    }
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDealTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const newArrivals = products.filter((p) => p.isNew).slice(0, 15);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 15);
  const trending = products.filter((p) => p.isTrending).slice(0, 15);
  const recommended = products.slice(15, 30);
  const flashSale = products.slice(0, 20);
  const limitedDeals = products.slice(30, 50);
  const clearanceSale = products.slice(50, 70);
  const topRated = products.slice(5, 25);

  const scrollCategories = (direction: 'left' | 'right') => {
    setCategoryScroll((prev) => {
      if (direction === 'left') return Math.max(0, prev - 300);
      return Math.min(1000, prev + 300);
    });
  };

  const scrollToDeals = () => {
    const flashSaleSection = document.getElementById('flash-sale');
    if (flashSaleSection) {
      flashSaleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[90vh] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=2000&h=1500)',
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-screen object-cover"
          src="https://static.videezy.com/system/resources/previews/000/043/938/original/200213_02.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
        >
          <div className="max-w-6xl w-full">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold mb-6 shadow-lg"
            >
              🎉 MEGA SALE - UP TO 70% OFF
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            >
              Discover Top Deals at
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                NexusMarket
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl md:text-3xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium"
            >
              Your ultimate destination for premium products at incredible prices.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
            >
              Discover thousands of items across all categories with fast shipping and secure checkout.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 rounded-xl font-bold text-2xl flex items-center gap-3 mx-auto transition-all shadow-2xl border-2 border-white/20"
              >
                Shop Now
                <ArrowRight className="w-7 h-7" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToCategories}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white px-12 py-6 rounded-xl font-bold text-2xl flex items-center gap-3 mx-auto transition-all shadow-xl"
              >
                Browse Categories
                <Tag className="w-7 h-7" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-wrap justify-center gap-8 text-white"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                <Truck className="w-6 h-6 text-blue-300" />
                <div className="text-left">
                  <div className="text-sm font-semibold">Free Shipping</div>
                  <div className="text-xs text-white/80">On orders over ₹500</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                <Shield className="w-6 h-6 text-green-300" />
                <div className="text-left">
                  <div className="text-sm font-semibold">Secure Checkout</div>
                  <div className="text-xs text-white/80">100% Protected</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                <Award className="w-6 h-6 text-yellow-300" />
                <div className="text-left">
                  <div className="text-sm font-semibold">Best Quality</div>
                  <div className="text-xs text-white/80">Premium Products</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                heroSlide === i ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-10 text-white shadow-xl cursor-pointer"
          >
            <Zap className="w-14 h-14 mb-4" />
            <h3 className="text-3xl font-bold mb-3">Fast Shipping</h3>
            <p className="text-lg">Free shipping on orders over ₹500</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-10 text-white shadow-xl cursor-pointer"
          >
            <Star className="w-14 h-14 mb-4" />
            <h3 className="text-3xl font-bold mb-3">Quality Guaranteed</h3>
            <p className="text-lg">30-day money-back guarantee</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-10 text-white shadow-xl cursor-pointer"
          >
            <TrendingUp className="w-14 h-14 mb-4" />
            <h3 className="text-3xl font-bold mb-3">Trending Products</h3>
            <p className="text-lg">Stay ahead with the latest trends</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="flash-sale"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <Zap className="w-16 h-16 animate-pulse" />
            </motion.div>
            <h2 className="text-5xl font-bold mb-4">⚡ FLASH SALE ⚡</h2>
            <p className="text-2xl mb-6">Limited Time Offer - Don't Miss Out!</p>
            <div className="flex justify-center gap-4 text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 min-w-[100px]">
                <div className="text-4xl font-bold">{dealTimeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="text-4xl font-bold flex items-center">:</div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 min-w-[100px]">
                <div className="text-4xl font-bold">{dealTimeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="text-4xl font-bold flex items-center">:</div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 min-w-[100px]">
                <div className="text-4xl font-bold">{dealTimeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {flashSale.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="categories"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Browse through our wide range of product categories
            </p>
          </motion.div>

          <div className="relative">
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="overflow-x-auto scrollbar-hide">
              <div
                className="flex gap-6 transition-transform duration-500"
                style={{ transform: `translateX(-${categoryScroll}px)` }}
              >
                {mockCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex-shrink-0 w-64 cursor-pointer"
                    onClick={() => navigate('/shop')}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-4xl mb-2">{category.icon}</div>
                          <h3 className="text-xl font-bold text-white">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                      {category.subcategories && (
                        <div className="p-4">
                          <div className="flex flex-wrap gap-2">
                            {category.subcategories.slice(0, 3).map((sub) => (
                              <span
                                key={sub.id}
                                className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                              >
                                {sub.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-10 h-10 text-yellow-500" />
              <h2 className="text-5xl font-bold text-gray-900">New Arrivals</h2>
            </div>
            <p className="text-xl text-gray-600">
              Check out our latest products - Fresh and trending!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                🎁 Special Offer Just For You!
              </h2>
              <p className="text-2xl text-white/90 mb-8">
                Sign up now and get 20% off your first order plus free shipping!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg text-lg focus:ring-4 focus:ring-white/50 focus:outline-none"
                />
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Discount
                </button>
              </div>
              <p className="text-white/80 mt-4">
                Join 100,000+ happy customers worldwide!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&h=600"
                alt="Special Offer"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h3 className="text-4xl font-bold mb-3">
                Weekend Super Sale!
              </h3>
              <p className="text-xl mb-4">
                Extra 30% OFF on all electronics - This weekend only!
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Shop Electronics
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 gap-4 text-white text-center"
            >
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold">48</div>
                <div className="text-sm">Hours Left</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold">30%</div>
                <div className="text-sm">Extra Off</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Products</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10 text-orange-500" />
              <h2 className="text-5xl font-bold text-gray-900">Best Sellers</h2>
            </div>
            <p className="text-xl text-gray-600">
              Our most popular products loved by thousands
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-10 h-10 text-red-500" />
              <h2 className="text-5xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <p className="text-xl text-gray-600">
              What everyone is buying right now
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {trending.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-10 h-10 text-pink-500" />
              <h2 className="text-5xl font-bold text-gray-900">
                Recommended For You
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Handpicked products based on your interests
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {recommended.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-10 h-10 text-yellow-600" />
              <h2 className="text-5xl font-bold text-gray-900">
                Limited Time Deals
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Grab these deals before they are gone! Ending soon!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {limitedDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-green-600 to-teal-600"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Clearance Sale - Up to 80% OFF
              </h2>
              <p className="text-2xl text-white/90 mb-8">
                Final markdowns on select items. Stock is limited - first come,
                first served!
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Shop Clearance
                </button>
                <button
                  onClick={scrollToDeals}
                  className="bg-white/10 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
                >
                  View All Deals
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=800&h=600"
                alt="Clearance Sale"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clearanceSale.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
              <h2 className="text-5xl font-bold text-gray-900">
                Top Rated Products
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Highest rated products by our community - 4.5+ stars
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {topRated.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {recentlyViewed.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-10 h-10 text-purple-500" />
                <h2 className="text-5xl font-bold text-gray-900">
                  Recently Viewed
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Pick up where you left off
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {recentlyViewed.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white mb-16"
          >
            <Gift className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-2xl text-white/90">
              Join thousands of satisfied shoppers worldwide
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-12 shadow-2xl"
              >
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={mockTestimonials[testimonialIndex].image}
                    alt={mockTestimonials[testimonialIndex].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold text-gray-900">
                        {mockTestimonials[testimonialIndex].name}
                      </h4>
                      {mockTestimonials[testimonialIndex].verified && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-green-700" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">
                      {mockTestimonials[testimonialIndex].product}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < mockTestimonials[testimonialIndex].rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {mockTestimonials[testimonialIndex].date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {mockTestimonials[testimonialIndex].review}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <span className="text-sm font-medium">Helpful</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                        {mockTestimonials[testimonialIndex].helpful}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                      <span className="text-sm font-medium">Not Helpful</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                        {mockTestimonials[testimonialIndex].notHelpful}
                      </span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {mockTestimonials[testimonialIndex].helpful +
                      mockTestimonials[testimonialIndex].notHelpful}{' '}
                    people found this review helpful
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-8">
              {mockTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === testimonialIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600">
              We partner with the world's best brands
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {brandLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={logo}
                  alt="Brand logo"
                  className="w-full h-12 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 py-20"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Join Our Newsletter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-white/90 mb-8"
          >
            Get exclusive deals and early access to new products. Plus, receive
            10% off your next order!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-lg focus:ring-4 focus:ring-white/50 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Subscribe
            </button>
          </motion.div>
          <p className="text-white/80 mt-6 text-lg">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};
