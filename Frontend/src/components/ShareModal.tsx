import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareLink: string;
}

const ShareModal = ({ isOpen, onClose, shareLink }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-white/20 bg-slate-800/80 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Share Tour</h2>
            <p className="mt-2 text-slate-300">Anyone with this link can view this demo.</p>
            <div className="mt-4 flex gap-2">
              <input type="text" readOnly value={shareLink} className="flex-1 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white" />
              <button onClick={handleCopy} className={`w-24 rounded-md px-4 py-2 text-sm font-semibold text-white ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ShareModal;