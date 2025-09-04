import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A simple SVG icon component for the feature cards
const FeatureIcon = ({ d }: { d: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-blue-400">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const HomePage = () => {
  return (
    // We add a container div for the aurora effect and another for the main content
    <div className="aurora-container">
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
            Create Interactive Demos
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
              In Seconds
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300 sm:text-xl">
            Build and share beautiful, interactive product tours without writing any code. 
            Capture your workflow and guide your users step-by-step.
          </p>
          <div className="mt-10">
            <Link
              to="/signup"
              className="rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
            >
              Get Started for Free
            </Link>
          </div>
        </motion.div>

        {/* --- NEW FEATURES SECTION --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24 max-w-7xl w-full"
        >
          <h2 className="text-3xl font-bold text-white mb-12">How SnapTour Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-black/10 p-8 backdrop-blur-lg">
              <FeatureIcon d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.811 7.58 2 8.288 2 9.288v5.424c0 1 .811 1.708 1.97 1.708.377 0 .754-.06.134-.175.603-.122 1.152-.3 1.626-.54.475-.238.884-.523 1.258-.842.375-.32.682-.676.942-1.056.255-.373.45-.78.577-1.21.123-.42.18-.86.18-1.31v-2.43c0-.45-.057-.89-.18-1.31-.127-.43-.322-.837-.577-1.21-.26-.38-.567-.736-.942-1.056a4.994 4.994 0 00-1.258-.842z" />
              <h3 className="text-xl font-semibold text-white">1. Capture & Create</h3>
              <p className="mt-2 text-slate-400">Effortlessly record your screen or upload screenshots. Add captions, highlights, and annotations to build your step-by-step tour in minutes.</p>
            </div>
            {/* Feature Card 2 */}
            <div className="rounded-2xl border border-white/10 bg-black/10 p-8 backdrop-blur-lg">
              <FeatureIcon d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 014.16 0m-11.48 0a12.022 12.022 0 004.16 0m-4.16 0a6 6 0 01-5.84-7.38v4.82m5.84 2.56V7.63m0 0a6 6 0 015.84-7.38v4.82m-5.84 2.56a12.022 12.022 0 00-4.16 0" />
              <h3 className="text-xl font-semibold text-white">2. Engage & Guide</h3>
              <p className="mt-2 text-slate-400">Your final demo isn't just a video. It's a fully interactive experience that lets users click, learn, and understand your product at their own pace.</p>
            </div>
            {/* Feature Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-black/10 p-8 backdrop-blur-lg">
              <FeatureIcon d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
              <FeatureIcon d="M21 21l-5.197-5.197" />
              <h3 className="text-xl font-semibold text-white">3. Share & Analyze</h3>
              <p className="mt-2 text-slate-400">Share your interactive demo with a single link. Our mocked analytics give you insight into how users are engaging with your product story.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;