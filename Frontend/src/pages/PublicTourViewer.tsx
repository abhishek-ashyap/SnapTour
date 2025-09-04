import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

interface Step { caption: string; image_url: string; }
interface Tour { title: string; steps: Step[]; }

const PublicTourViewer = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchPublicTour = async () => {
      try {
        const response = await api.get(`/public/tours/${tourId}`);
        setTour(response.data);
      } catch (err) {
        setError('This tour could not be found or is private.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicTour();
  }, [tourId]);

  const goToNextStep = () => {
    if (tour && currentStep < tour.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen aurora-container text-white">Loading Tour...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen aurora-container text-red-400">{error}</div>;
  if (!tour) return null;

  const step = tour.steps[currentStep];

  return (
    <div className="aurora-container min-h-screen text-white flex flex-col">
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold">{tour.title}</h1>
        <p className="text-sm text-slate-300">Step {currentStep + 1} of {tour.steps.length}</p>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl aspect-video bg-black/20 rounded-xl shadow-2xl border border-white/10 relative"
          >
            <img src={step.image_url} alt={step.caption} className="object-contain w-full h-full rounded-xl" />
            <div className="absolute bottom-5 left-5 right-5 bg-black/50 backdrop-blur text-white p-3 rounded-lg border border-white/10 text-center">
              <p>{step.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="p-4 flex justify-center items-center gap-4">
        <button onClick={goToPrevStep} disabled={currentStep === 0} className="px-4 py-2 rounded-md bg-slate-700/50 hover:bg-slate-700 disabled:opacity-50">Previous</button>
        <button onClick={goToNextStep} disabled={currentStep === tour.steps.length - 1} className="px-4 py-2 rounded-md bg-slate-700/50 hover:bg-slate-700 disabled:opacity-50">Next</button>
      </footer>
    </div>
  );
};

export default PublicTourViewer;