import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside
            className="w-full max-w-sm rounded-2xl border border-white/20 bg-slate-800/50 p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-slate-300">{message}</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="rounded-md bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-md bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-red-500/30"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;