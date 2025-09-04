import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShareModal from '../components/ShareModal'; // Import the new modal

interface Tour {
  id: string;
  title: string;
  is_public: boolean;
  created_at: string;
}

const DashboardPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareLink, setShareLink] = useState(''); // State to control the modal

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get('/tours');
        setTours(response.data);
      } catch (err) {
        setError('Failed to fetch tours.');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleShare = (e: React.MouseEvent, tourId: string) => {
    e.stopPropagation(); // Prevents navigating to the editor
    e.preventDefault();
    const link = `${window.location.origin}/view/tour/${tourId}`;
    setShareLink(link);
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading your demos...</div>;
  if (error) return <div className="p-10 text-center text-red-400">{error}</div>;

  return (
    <>
      <ShareModal isOpen={!!shareLink} onClose={() => setShareLink('')} shareLink={shareLink} />
      <div className="aurora-container min-h-[calc(100vh-65px)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Your Demos</h1>
            <Link 
              to="/editor/new"
              className="rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/30 transition-transform transform hover:scale-105"
            >
              + Create New Demo
            </Link>
          </div>
          
          {tours.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">No Demos Yet</h3>
              <p className="text-slate-400 mt-2">Click the button above to create your first interactive demo!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour, index) => (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} key={tour.id}>
                  <Link to={`/editor/${tour.id}`} className="block h-full">
                    <div className="h-full p-5 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-xl shadow-lg hover:border-white/20 hover:-translate-y-1 transition-all flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white truncate">{tour.title}</h3>
                        <p className={`text-xs mt-2 font-medium ${tour.is_public ? 'text-green-400' : 'text-slate-400'}`}>
                          {tour.is_public ? 'Public' : 'Private'}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="text-sm text-slate-400 space-y-1">
                          <p>Views: {Math.floor(Math.random() * 1000)}</p>
                          <p>Completions: {Math.floor(Math.random() * 80)}%</p>
                        </div>
                        {tour.is_public && (
                          <button onClick={(e) => handleShare(e, tour.id)} className="rounded-md bg-slate-700 hover:bg-slate-600 px-3 py-1.5 text-xs font-medium text-white z-10">
                            Share
                          </button>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default DashboardPage;