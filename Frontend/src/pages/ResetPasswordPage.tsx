import { useState, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password: passwords.password });
      setMessage(response.data.msg + ' Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.errors?.[0]?.msg || 'An error occurred.');
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
          <h2 className="text-3xl font-bold tracking-tight text-white">Reset Your Password</h2>
          <p className="mt-2 text-sm text-slate-300">Enter your new password below.</p>
        </div>

        {!message.includes('successfully') ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input id="password" name="password" type="password" required value={passwords.password} onChange={handleChange} className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="New Password" />
            </div>
            <div>
              <input id="confirmPassword" name="confirmPassword" type="password" required value={passwords.confirmPassword} onChange={handleChange} className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Confirm New Password" />
            </div>
            {message && <p className="text-center text-pink-400 text-sm">{message}</p>}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/30">
              {loading ? 'Resetting...' : 'Reset Password'}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-300">{message}</p>
            <Link to="/login" className="mt-4 inline-block font-semibold text-blue-400 hover:underline">
              Proceed to Sign In
            </Link>
          </div>
        )}
      </motion.div>
    </main>
  );
};

export default ResetPasswordPage;