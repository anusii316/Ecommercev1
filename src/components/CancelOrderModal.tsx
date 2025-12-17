import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
}

export const CancelOrderModal = ({ isOpen, onClose, onConfirm, orderNumber }: CancelOrderModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[300] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 z-[300]"
          onClick={handleCancel}
          style={{ pointerEvents: 'auto' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-[301] w-full max-w-md mx-4"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Cancel this order?
                    </h2>
                  </div>
                </div>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-3">
                  Are you sure you want to cancel order <span className="font-semibold">#{orderNumber}</span>?
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Note:</span> Once cancelled, this action cannot be undone. You will need to place a new order if you change your mind.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  Keep Order
                </button>
                <button
                  onClick={handleConfirm}
                  type="button"
                  className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
