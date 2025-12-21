import { Request, Response } from 'express';
import db from '../db';

/**
 * GET PUBLIC TOUR + STEPS
 */
export const getPublicTour = async (req: Request, res: Response) => {
  const { id: tourId } = req.params;

  try {
    const tourResult = await db.query(
      `SELECT *
       FROM tours
       WHERE id = $1`,
      [tourId]
    );

    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found' });
    }

    const tour = tourResult.rows[0];

    if (!tour.is_public) {
      return res.status(403).json({ msg: 'This tour is private' });
    }

    const stepsResult = await db.query(
      `SELECT *
       FROM steps
       WHERE tour_id = $1
       ORDER BY created_at ASC`,
      [tourId]
    );

    res.status(200).json({
      ...tour,
      steps: stepsResult.rows,
    });
  } catch (err: any) {
    console.error('getPublicTour:', err.message);
    res.status(500).send('Server Error');
  }
};
