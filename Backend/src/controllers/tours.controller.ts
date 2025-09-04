import { Request, Response } from 'express';
import db from '../db';

export const createTour = async (req: Request, res: Response) => {
  const { title } = req.body;
  const ownerId = req.user?.id;

  if (!title) {
    return res.status(400).json({ msg: 'Please provide a title for the tour' });
  }

  if (!ownerId) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const newTour = await db.query(
      'INSERT INTO tours (title, owner_id) VALUES ($1, $2) RETURNING *',
      [title, ownerId]
    );

    res.status(201).json(newTour.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getUserTours = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const tours = await db.query(
      'SELECT * FROM tours WHERE owner_id = $1 ORDER BY created_at DESC',
      [ownerId]
    );

    res.status(200).json(tours.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- THIS FUNCTION IS UPDATED ---
export const getTourById = async (req: Request, res: Response) => {
  const { id: tourId } = req.params;
  const userId = req.user?.id;

  try {
    // 1. Fetch the tour and verify ownership
    const tourResult = await db.query(
      'SELECT * FROM tours WHERE id = $1 AND owner_id = $2',
      [tourId, userId]
    );

    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found or you do not have permission to view it' });
    }

    const tour = tourResult.rows[0];

    // 2. Fetch all steps for that tour, ordered by their index
    const stepsResult = await db.query(
      'SELECT * FROM steps WHERE tour_id = $1 ORDER BY order_index ASC',
      [tourId]
    );

    // 3. Combine the tour and its steps into a single response object
    const response = {
      ...tour,
      steps: stepsResult.rows
    };

    res.status(200).json(response);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateTour = async (req: Request, res: Response) => {
  const { id: tourId } = req.params;
  const userId = req.user?.id;
  const { title, is_public } = req.body;

  try {
    const tourResult = await db.query(
      'SELECT * FROM tours WHERE id = $1 AND owner_id = $2',
      [tourId, userId]
    );

    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found or you do not have permission to edit it' });
    }

    const currentTour = tourResult.rows[0];
    const newTitle = title !== undefined ? title : currentTour.title;
    const newIsPublic = is_public !== undefined ? is_public : currentTour.is_public;

    const updatedTour = await db.query(
      'UPDATE tours SET title = $1, is_public = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [newTitle, newIsPublic, tourId]
    );

    res.status(200).json(updatedTour.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  const { id: tourId } = req.params;
  const userId = req.user?.id;

  try {
    const deleteResult = await db.query(
      'DELETE FROM tours WHERE id = $1 AND owner_id = $2',
      [tourId, userId]
    );

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ msg: 'Tour not found or you do not have permission to delete it' });
    }

    res.status(200).json({ msg: 'Tour successfully deleted' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};