import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

interface Step {
  id?: string;
  caption: string;
  image_url: string | null;
  step_order: number;
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

  const [tour, setTour] = useState<Tour>({
    title: '',
    is_public: false,
    steps: [],
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ================= FETCH TOUR =================
  useEffect(() => {
    if (!tourId) {
      setTour({ title: 'Untitled Demo', is_public: false, steps: [] });
      setLoading(false);
      return;
    }

    const fetchTour = async () => {
      try {
        const res = await api.get(`/tours/${tourId}`);
        setTour(res.data);
        if (res.data.steps.length > 0) setActiveStepIndex(0);
      } catch {
        setError('Failed to load tour data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  // ================= TOUR TITLE =================
  const handleTitleChange = (value: string) => {
    setTour(prev => ({ ...prev, title: value }));
  };

  // ================= STEP CRUD =================
  const handleAddStep = () => {
    setTour(prev => {
      const steps = [
        ...prev.steps,
        {
          caption: '',
          image_url: '',
          step_order: prev.steps.length,
        },
      ];
      setActiveStepIndex(steps.length - 1);
      return { ...prev, steps };
    });
  };

  const handleStepChange = (
    field: 'caption' | 'image_url',
    value: string
  ) => {
    if (activeStepIndex === null) return;

    setTour(prev => {
      const steps = [...prev.steps];
      steps[activeStepIndex] = {
        ...steps[activeStepIndex],
        [field]: value,
      };
      return { ...prev, steps };
    });
  };

  // ✅ DELETE STEP (LOCAL, SAFE)
  const handleDeleteStep = (index: number) => {
    setTour(prev => {
      const steps = prev.steps
        .filter((_, i) => i !== index)
        .map((step, i) => ({
          ...step,
          step_order: i,
        }));

      return { ...prev, steps };
    });

    setActiveStepIndex(prev =>
      prev === null
        ? null
        : prev > index
          ? prev - 1
          : prev === index
            ? null
            : prev
    );
  };

  // ================= RECORDING (PLACEHOLDER) =================
  const handleScreenRecord = async () => {
    if (activeStepIndex === null) return;

    try {
      await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      setTour(prev => {
        const steps = [...prev.steps];
        steps[activeStepIndex] = {
          ...steps[activeStepIndex],
          image_url: '🎥 Screen recording captured (placeholder)',
        };
        return { ...prev, steps };
      });

      alert('Screen recording captured (placeholder only)');
    } catch {
      alert('Screen recording permission denied');
    }
  };

  // ================= SAVE =================
  const handleSaveTour = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setError('');

    try {
      const tourData = { title: tour.title };
      let currentTourId = tourId;

      if (!currentTourId) {
        const res = await api.post('/tours', tourData);
        currentTourId = res.data.id;
      } else {
        await api.put(`/tours/${currentTourId}`, tourData);
        await api.delete(`/tours/${currentTourId}/steps`);
      }

      await Promise.all(
        tour.steps.map(step =>
          api.post(`/tours/${currentTourId}/steps`, {
            caption: step.caption,
            image_url: step.image_url,
            step_order: step.step_order,
          })
        )
      );

      navigate('/dashboard');
    } catch {
      setError('Failed to save the tour.');
    } finally {
      setIsSaving(false);
    }
  };

  // ================= DELETE TOUR =================
  const confirmDeleteTour = async () => {
    if (!tourId) return;
    try {
      await api.delete(`/tours/${tourId}`);
      navigate('/dashboard');
    } catch {
      setError('Failed to delete tour.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const activeStep =
    activeStepIndex !== null ? tour.steps[activeStepIndex] : null;

  if (loading) return <div className="p-10 text-center">Loading Editor…</div>;
  if (error) return <div className="p-10 text-center text-red-400">{error}</div>;

  // ================= UI =================
  return (
    <>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTour}
        title="Delete Tour"
        message="Are you sure you want to permanently delete this tour and all its steps?"
      />

      <div className="flex flex-col lg:flex-row h-full p-4">
        {/* LEFT */}
        <aside className="w-72 bg-slate-900 p-4 rounded-lg">
          <input
            value={tour.title}
            onChange={e => handleTitleChange(e.target.value)}
            className="w-full p-2 mb-4 bg-slate-800 text-white rounded-md"
          />

          {tour.steps.map((step, index) => (
            <div
              key={index}
              onClick={() => setActiveStepIndex(index)}
              className={`p-2 mb-2 cursor-pointer rounded-md ${
                index === activeStepIndex
                  ? 'bg-blue-600'
                  : 'bg-slate-700 hover:bg-slate-600'
              } text-white`}
            >
              Step {index + 1}: {step.caption || 'New Step'}
            </div>
          ))}

          <button
            onClick={handleAddStep}
            className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-md"
          >
            + Add Step
          </button>
        </aside>

        {/* RIGHT */}
        <main className="flex-1 p-6">
          {activeStep ? (
            <>
              <input
                value={activeStep.caption}
                onChange={e =>
                  handleStepChange('caption', e.target.value)
                }
                className="w-full p-2 mb-2 bg-slate-800 text-white rounded-md"
              />

              <textarea
                value={activeStep.image_url ?? ''}
                onChange={e =>
                  handleStepChange('image_url', e.target.value)
                }
                className="w-full p-2 bg-slate-800 text-white rounded-md"
              />

              <button
                onClick={handleScreenRecord}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-md shadow-lg"
              >
                🎥 Start Screen Recording
              </button>

              {/* 🗑️ DELETE STEP */}
              <button
                onClick={() => handleDeleteStep(activeStepIndex!)}
                className="w-full mt-3 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-md"
              >
                🗑️ Delete Step
              </button>
            </>
          ) : (
            <p className="text-slate-400">Select a step</p>
          )}

          <button
            onClick={handleSaveTour}
            disabled={isSaving}
            className={`w-full mt-4 py-2 text-white rounded-md shadow-lg ${
              isSaving
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {isSaving ? 'Saving…' : 'Save Tour'}
          </button>

          {tourId && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-md shadow-lg"
            >
              Delete Tour
            </button>
          )}
        </main>
      </div>
    </>
  );
};

export default EditorPage;
