import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShareModal from '../components/ShareModal';
import ConfirmModal from '../components/ConfirmModal';

interface Tour {
  id: string;
  title: string;
  is_public: boolean;
  created_at: string;
}

const DashboardPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await api.get('/tours');
      setTours(res.data);
    } catch {
      setError('Failed to fetch tours.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.size === tours.length
        ? new Set()
        : new Set(tours.map(t => t.id))
    );
  };

  const confirmDeleteSelected = async () => {
    try {
      await Promise.all(
        Array.from(selectedIds).map(id => api.delete(`/tours/${id}`))
      );
      setSelectedIds(new Set());
      fetchTours();
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleShare = (e: React.MouseEvent, tourId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setShareLink(`${window.location.origin}/view/tour/${tourId}`);
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading your demos...</div>;
  if (error) return <div className="p-10 text-center text-red-400">{error}</div>;

  return (
    <>
      <ShareModal isOpen={!!shareLink} onClose={() => setShareLink('')} shareLink={shareLink} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteSelected}
        title="Delete Selected Demos"
        message={`Are you sure you want to permanently delete ${selectedIds.size} demo(s)?`}
      />

      <div className="aurora-container min-h-[calc(100vh-65px)]">
        <div className="container mx-auto px-4 py-8">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Your Demos</h1>

            <div className="flex gap-3">
              {selectedIds.size > 0 && (
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm shadow-lg"
                >
                  Delete Selected ({selectedIds.size})
                </button>
              )}

              <Link
                to="/editor/new"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-md text-white text-sm shadow-lg transition-transform hover:scale-105"
              >
                + Create New Demo
              </Link>
            </div>
          </div>

          {tours.length > 0 && (
            <div className="mb-4 flex items-center gap-2 text-slate-300">
              <input type="checkbox" checked={selectedIds.size === tours.length} onChange={toggleSelectAll} />
              Select All
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <motion.div key={tour.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Link to={`/editor/${tour.id}`}>
                  <div className="relative p-5 rounded-xl border border-white/10 bg-black/10 hover:border-white/20 transition-all">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(tour.id)}
                      onClick={e => e.stopPropagation()}
                      onChange={() => toggleSelect(tour.id)}
                      className="absolute top-3 left-3"
                    />
                    <h3 className="font-bold text-white truncate pl-6">{tour.title}</h3>
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`text-xs ${tour.is_public ? 'text-green-400' : 'text-slate-400'}`}>
                        {tour.is_public ? 'Public' : 'Private'}
                      </span>
                      {tour.is_public && (
                        <button onClick={e => handleShare(e, tour.id)} className="bg-slate-700 px-3 py-1 text-xs rounded-md text-white">
                          Share
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
