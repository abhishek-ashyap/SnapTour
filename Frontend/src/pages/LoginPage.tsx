import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { supabase } from '../services/supabase';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1️⃣ Login via Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      if (!data.session) {
        throw new Error('No session returned from Supabase');
      }

      // 2️⃣ Store access token
      localStorage.setItem('token', data.session.access_token);

      // 3️⃣ Ensure profile exists
      await api.post('/auth/sync-profile');

      // 4️⃣ Redirect
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full px-4 aurora-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/20 bg-black/10 p-6 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Sign In</h2>
          <p className="mt-2 text-sm text-slate-300">Welcome back.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-white"
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-white"
            placeholder="Password"
          />

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="font-semibold text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-pink-400 text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <div className="pt-4 text-center text-sm text-slate-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-400 hover:underline">
              Sign up now
            </Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default LoginPage;
