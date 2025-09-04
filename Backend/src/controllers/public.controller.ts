import { Request, Response } from 'express';
import db from '../db';

// @desc    Get a single public tour by ID, including its steps
export const getPublicTour = async (req: Request, res: Response) => {
  const { id: tourId } = req.params;

  try {
    // 1. Fetch the tour by its ID
    const tourResult = await db.query('SELECT * FROM tours WHERE id = $1', [tourId]);

    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found' });
    }

    const tour = tourResult.rows[0];

    // 2. Security Check: Only return the tour if it's marked as public
    if (!tour.is_public) {
      return res.status(403).json({ msg: 'This tour is private and cannot be viewed' });
    }

    // 3. Fetch all steps for the public tour
    const stepsResult = await db.query(
      'SELECT * FROM steps WHERE tour_id = $1 ORDER BY order_index ASC',
      [tourId]
    );

    // 4. Combine and send the response
    const response = {
      ...tour,
      steps: stepsResult.rows,
    };

    res.status(200).json(response);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};