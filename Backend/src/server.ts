import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import db from './db';
import authRoutes from './routes/auth.routes';
import tourRoutes from './routes/tours.routes';
import stepsRoutes from './routes/steps.routes';
import publicRoutes from './routes/public.routes'; // Import public routes

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(helmet());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/tours/:tourId/steps', stepsRoutes);
app.use('/api/public', publicRoutes); // Use the public routes

// --- Test Route ---
// ... (rest of the file is the same)
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong!' });
});

// --- Start Server ---
const startServer = async () => {
  try {
    await db.query('SELECT NOW()');
    console.log('🐘 Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};
startServer();