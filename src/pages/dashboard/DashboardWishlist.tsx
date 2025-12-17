import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import { useToastStore } from '../../stores/toastStore';
import { useNavigate } from 'react-router-dom';

export const DashboardWishlist = () => {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeFromWishlist(item.id);
    addToast(`${item.name} moved to cart!`, 'success');
  };

  const handleRemove = (item: typeof items[0]) => {
    removeFromWishlist(item.id);
    addToast(`${item.name} removed from wishlist`, 'info');
  };

  if (items.length === 0) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h2>
          <p className="text-gray-600">Save items you love for later</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-12 text-center"
        >
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Start adding items to your wishlist by clicking the heart icon on products you love
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h2>
        <p className="text-gray-600">{items.length} items saved for later</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="p-6">
              <h3
                onClick={() => navigate(`/product/${item.id}`)}
                className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {item.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Move to Cart
                </button>
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-gray-200 hover:bg-red-50 text-gray-700 hover:text-red-600 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
