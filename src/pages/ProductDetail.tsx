import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronRight as BreadcrumbArrow,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { useProductsStore } from '../stores/productsStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useToastStore } from '../stores/toastStore';
import { ProductCard } from '../components/ProductCard';
import {
  generateProductHighlights,
  generateProductSpecifications,
} from '../utils/productDataGenerator';
import { generateProductReviews } from '../utils/reviewGenerator';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProductsStore();
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlistStore();
  const { addToast } = useToastStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs' | 'reviews'>('highlights');
  const [reviewFilter, setReviewFilter] = useState<'all' | 5 | 4 | 3 | 2 | 1>('all');
  const [reviewSort, setReviewSort] = useState<'newest' | 'highest'>('newest');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const product = products.find((p) => p.id === id);

  const productHighlights = useMemo(() => {
    return product ? generateProductHighlights(product) : [];
  }, [product?.id]);

  const productSpecs = useMemo(() => {
    return product ? generateProductSpecifications(product) : [];
  }, [product?.id]);

  const productReviews = useMemo(() => {
    return product ? generateProductReviews(product, 40) : [];
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 10);
  }, [product?.id, product?.category, products]);

  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  const filteredReviews = useMemo(() => {
    if (reviewFilter === 'all') return productReviews;
    return productReviews.filter((r) => r.rating === reviewFilter);
  }, [productReviews, reviewFilter]);

  const sortedReviews = useMemo(() => {
    const reviews = [...filteredReviews];
    if (reviewSort === 'newest') {
      return reviews.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    }
    return reviews.sort((a, b) => b.rating - a.rating);
  }, [filteredReviews, reviewSort]);

  const reviewStats = useMemo(() => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        stats[review.rating as keyof typeof stats]++;
      }
    });
    return stats;
  }, [productReviews]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
    setActiveTab('highlights');
    setReviewFilter('all');
    setCarouselIndex(0);
  }, [id]);

  useEffect(() => {
    if (product) {
      const viewed = localStorage.getItem('recentlyViewed');
      let viewedIds: string[] = viewed ? JSON.parse(viewed) : [];
      viewedIds = viewedIds.filter((vid) => vid !== product.id);
      viewedIds.unshift(product.id);
      viewedIds = viewedIds.slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(viewedIds));
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity < 1) {
      addToast('Please select a valid quantity', 'error');
      return;
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    addToast(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart!`, 'success');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      addToast('Added to wishlist!', 'success');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        addToast('Share cancelled', 'info');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <button
            onClick={() => navigate('/')}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <BreadcrumbArrow className="w-4 h-4" />
          <button
            onClick={() => navigate('/shop')}
            className="hover:text-blue-600 transition-colors"
          >
            Shop
          </button>
          <BreadcrumbArrow className="w-4 h-4" />
          <span className="hover:text-blue-600 transition-colors cursor-pointer">
            {product.category}
          </span>
          <BreadcrumbArrow className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                src={product.gallery[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? 'border-blue-600'
                      : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded">
                  <span className="font-semibold">{product.rating}</span>
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <span className="text-gray-600 font-medium">
                  {productReviews.length.toLocaleString()} Ratings & {productReviews.length} Reviews
                </span>
              </div>

              {product.isBestSeller && (
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded mb-3">
                  #1 Best Seller in {product.category}
                </span>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="mb-2">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg font-semibold text-green-600">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-sm text-gray-600">
                    You save: ${(product.originalPrice - product.price).toFixed(2)}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500">Inclusive of all taxes</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">About this item:</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-xs font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-xs font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-xs font-medium text-gray-900">Warranty</p>
                <p className="text-xs text-gray-500">1-year manufacturer</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 hover:border-blue-600 rounded-full font-bold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 h-10 text-center border-2 border-gray-300 rounded font-semibold text-gray-900"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 hover:border-blue-600 rounded-full font-bold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <ShoppingCart className="w-6 h-6" />
                ADD TO CART
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`px-5 py-3 rounded border-2 transition-colors ${
                  isInWishlist
                    ? 'border-red-500 bg-red-50 hover:bg-red-100'
                    : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
                }`}
                title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share this product
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="flex gap-4 border-b mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('highlights')}
              className={`pb-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'highlights'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Reviews ({productReviews.length})
            </button>
          </div>

          {activeTab === 'highlights' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productHighlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <div className={`p-3 rounded-lg ${highlight.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{highlight.title}</h4>
                          <p className="text-sm text-gray-600">{highlight.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-8">
              {productSpecs.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {section.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{spec.label}</span>
                        <span className="text-gray-600 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8 pb-8 border-b">
                <div className="md:col-span-1">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {product.rating}
                    </div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Based on {productReviews.length} reviews</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {rating} star
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-yellow-400 h-3 rounded-full transition-all"
                            style={{
                              width: `${(reviewStats[rating as keyof typeof reviewStats] / productReviews.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {reviewStats[rating as keyof typeof reviewStats]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Customer Reviews
                </h3>
                <div className="flex gap-4">
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value === 'all' ? 'all' : Number(e.target.value) as 5 | 4 | 3 | 2 | 1)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <select
                    value={reviewSort}
                    onChange={(e) => setReviewSort(e.target.value as 'newest' | 'highest')}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  >
                    <option value="newest">Most Recent</option>
                    <option value="highest">Highest Rating</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">
                                {review.author}
                              </h4>
                              {review.verified && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                        <p className="text-gray-700 leading-relaxed mb-3">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <button className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                            <span>Helpful</span>
                            <span className="font-semibold">({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>

            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6"
                  animate={{ x: -carouselIndex * 320 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 w-72"
                    >
                      <ProductCard product={relatedProduct} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {relatedProducts.length > 4 && (
                <>
                  {carouselIndex > 0 && (
                    <button
                      onClick={() => setCarouselIndex(carouselIndex - 1)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors z-10"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                  )}

                  {carouselIndex < relatedProducts.length - 4 && (
                    <button
                      onClick={() => setCarouselIndex(carouselIndex + 1)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors z-10"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
