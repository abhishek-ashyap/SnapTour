import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.msg);
    } catch (err) {
      // Still show a positive message for security
      setMessage('If an account with that email exists, a password reset link has been sent.');
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
          <h2 className="text-3xl font-bold tracking-tight text-white">Forgot Password</h2>
          <p className="mt-2 text-sm text-slate-300">Enter your email to receive a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!message ? (
            <>
              <div className="relative">
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Email" />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/30">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </motion.button>
            </>
          ) : (
            // This className fixes the issue
            <p className="text-center text-green-300">{message}</p>
          )}

          <div className="pt-4 text-center text-sm text-slate-400">
            <Link to="/login" className="font-semibold text-blue-400 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default ForgotPasswordPage;