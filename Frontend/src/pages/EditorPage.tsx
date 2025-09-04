import { useState, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

interface Step {
  id?: string;
  caption: string;
  image_url: string;
  order_index: number;
}
interface Tour {
  id?: string;
  title: string;
  is_public?: boolean;
  steps: Step[];
}

const EditorPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  
  const [tour, setTour] = useState<Tour>({ title: '', is_public: false, steps: [] });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (tourId) {
      setLoading(true);
      const fetchTour = async () => {
        try {
          const response = await api.get(`/tours/${tourId}`);
          setTour(response.data);
          if (response.data.steps.length > 0) setActiveStepIndex(0);
        } catch (err) {
          setError('Failed to load tour data.');
        } finally {
          setLoading(false);
        }
      };
      fetchTour();
    } else {
      setTour({ title: 'Untitled Demo', is_public: false, steps: [] });
      setLoading(false);
    }
  }, [tourId]);
  
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTour({ ...tour, title: e.target.value });
  const handleAddStep = () => {
    const newStep: Step = { caption: '', image_url: 'https://placehold.co/1280x720/1E293B/94A3B8?text=New+Step', order_index: tour.steps.length };
    const updatedSteps = [...tour.steps, newStep];
    setTour({ ...tour, steps: updatedSteps });
    setActiveStepIndex(updatedSteps.length - 1);
  };
  const handleStepChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (activeStepIndex === null) return;
    const { name, value } = e.target;
    const updatedSteps = [...tour.steps];
    updatedSteps[activeStepIndex] = { ...updatedSteps[activeStepIndex], [name]: value };
    setTour({ ...tour, steps: updatedSteps });
  };
  const handleDeleteStep = (indexToDelete: number) => {
    const updatedSteps = tour.steps.filter((_, index) => index !== indexToDelete);
    const reorderedSteps = updatedSteps.map((step, index) => ({ ...step, order_index: index }));
    setTour({ ...tour, steps: reorderedSteps });
    if (activeStepIndex === indexToDelete) setActiveStepIndex(reorderedSteps.length > 0 ? 0 : null);
    else if (activeStepIndex !== null && activeStepIndex > indexToDelete) setActiveStepIndex(activeStepIndex - 1);
  };
  const handleSaveTour = async () => {
    setIsSaving(true);
    setError('');
    try {
      const tourData = { title: tour.title, is_public: tour.is_public };
      if (tourId) {
        await api.put(`/tours/${tourId}`, tourData);
        await api.delete(`/tours/${tourId}/steps`);
        const stepPromises = tour.steps.map((step, index) => api.post(`/tours/${tourId}/steps`, { ...step, order_index: index }));
        await Promise.all(stepPromises);
      } else {
        const response = await api.post('/tours', tourData);
        const newTourId = response.data.id;
        if (tour.steps.length > 0) {
          const stepPromises = tour.steps.map((step, index) => api.post(`/tours/${newTourId}/steps`, { ...step, order_index: index }));
          await Promise.all(stepPromises);
        }
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save the tour.');
    } finally {
      setIsSaving(false);
    }
  };
  const handleScreenRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      alert('Screen recording started!');
      stream.getTracks().forEach(track => track.stop());
    } catch (err) { alert('Screen recording permission was denied.'); }
  };
  
  const handleDeleteTour = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTour = async () => {
    if (!tourId) return;
    try {
      await api.delete(`/tours/${tourId}`);
      setIsDeleteModalOpen(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete tour. Please try again.');
      setIsDeleteModalOpen(false);
    }
  };
  
  const activeStep = activeStepIndex !== null ? tour.steps[activeStepIndex] : null;

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Editor...</div>;
  if (error) return <div className="p-10 text-center text-red-400">{error}</div>;

  return (
    <>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTour}
        title="Delete Tour"
        message="Are you sure you want to permanently delete this tour and all its steps? This action cannot be undone."
      />

      <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-65px)] aurora-container">
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
          <aside className="w-full lg:w-72 rounded-xl border border-white/10 bg-black/10 backdrop-blur-xl p-4 flex flex-col h-full">
            <input type="text" value={tour.title} onChange={handleTitleChange} className="bg-slate-800/50 text-xl font-semibold mb-4 text-white p-2 rounded-md w-full border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            <div className="flex-grow space-y-2 overflow-y-auto pr-2">
              {tour.steps.map((step, index) => (
                <div key={index} onClick={() => setActiveStepIndex(index)} className={`p-2.5 rounded-lg cursor-pointer flex justify-between items-center group ${activeStepIndex === index ? 'bg-blue-600' : 'bg-slate-700/50 hover:bg-slate-700'}`}>
                  <p className="text-sm truncate text-white">Step {index + 1}: {step.caption || 'New Step'}</p>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteStep(index); }} className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                </div>
              ))}
            </div>
            <button onClick={handleAddStep} className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
              + Add Step
            </button>
          </aside>
          
          <div className='flex-1 flex flex-col gap-4'>
              <main className="flex-1 flex items-center justify-center min-h-[300px] lg:min-h-0">
                <div className="w-full h-full bg-black/20 rounded-xl flex items-center justify-center relative shadow-2xl border border-white/10">
                  {activeStep ? <img src={activeStep.image_url} alt="Step preview" className="object-contain max-h-full max-w-full rounded-lg" /> : <p className="text-slate-400">Select or add a step</p>}
                  {activeStep && <div className="absolute bottom-5 left-5 right-5 bg-black/50 backdrop-blur text-white p-3 rounded-lg border border-white/10 text-center">{activeStep.caption}</div>}
                </div>
              </main>

              <aside className="w-full lg:w-auto rounded-xl border border-white/10 bg-black/10 backdrop-blur-xl p-4 flex flex-col">
                <div className="flex-grow">
                  <div className="space-y-4 mb-4 pb-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Tour Settings</h2>
                    <div className="flex items-center justify-between">
                      <label htmlFor="is_public" className="text-sm font-medium text-slate-300">Make Tour Public</label>
                      <button id="is_public" onClick={() => setTour({ ...tour, is_public: !tour.is_public })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${tour.is_public ? 'bg-blue-500' : 'bg-slate-700'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tour.is_public ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                  {activeStep ? (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-white">Edit Step {activeStepIndex! + 1}</h2>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Caption</label>
                        <textarea name="caption" rows={4} className="w-full bg-slate-800/50 border border-slate-700 rounded-md text-white p-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" value={activeStep.caption} onChange={handleStepChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                        <input name="image_url" type="text" className="w-full bg-slate-800/50 border border-slate-700 rounded-md text-white p-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" value={activeStep.image_url} onChange={handleStepChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Record Screen</label>
                        <button onClick={handleScreenRecord} className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md">
                          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                          Start Recording
                        </button>
                      </div>
                    </div>
                  ) : (<p className="text-slate-400 p-4">Select a step to edit.</p>)}
                </div>
                <div className="mt-4 space-y-2">
                  <button onClick={handleSaveTour} disabled={isSaving} className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/30">
                    {isSaving ? 'Saving...' : 'Save Tour'}
                  </button>
                  {tourId && (
                    <button onClick={handleDeleteTour} className="w-full rounded-md bg-red-800/50 hover:bg-red-800/80 px-4 py-2 text-sm font-medium text-red-200">
                      Delete Tour
                    </button>
                  )}
                </div>
                {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
              </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorPage;