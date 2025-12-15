import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../services/supabase";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Supabase ALWAYS returns success (anti-enumeration)
    setMessage(
      "If an account with that email exists, a password reset link has been sent."
    );
  };

  return (
    <main className="flex items-center justify-center min-h-screen aurora-container px-4">
      <motion.div className="w-full max-w-sm rounded-2xl border border-white/20 bg-black/10 p-6 backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 text-white"
          />

          {error && <p className="text-pink-400 text-sm text-center">{error}</p>}
          {message && <p className="text-green-400 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2.5 rounded-md text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-sm text-center text-slate-400">
            <Link to="/login" className="text-blue-400 font-semibold">
              Back to login
            </Link>
          </p>
        </form>
      </motion.div>
    </main>
  );
};

export default ForgotPasswordPage;
