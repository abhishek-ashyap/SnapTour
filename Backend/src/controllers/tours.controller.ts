import { Request, Response } from 'express';
import db from '../db';

/**
 * CREATE TOUR
 */
export const createTour = async (req: Request, res: Response) => {
  const { title } = req.body;
  const ownerId = req.user?.id;

  if (!title) {
    return res.status(400).json({ msg: 'Title required' });
  }
  if (!ownerId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO tours (title, owner_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [title, ownerId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('createTour:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * GET ALL TOURS FOR LOGGED-IN USER
 */
export const getUserTours = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      `
      SELECT *
      FROM tours
      WHERE owner_id = $1
      ORDER BY created_at DESC
      `,
      [ownerId]
    );

    res.json(result.rows);
  } catch (err: any) {
    console.error('getUserTours:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * GET SINGLE TOUR + STEPS
 */
export const getTourById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ownerId = req.user?.id;

  try {
    const tourResult = await db.query(
      `
      SELECT *
      FROM tours
      WHERE id = $1 AND owner_id = $2
      `,
      [id, ownerId]
    );

    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found' });
    }

    const stepsResult = await db.query(
      `
      SELECT id, caption, image_url, step_order
      FROM steps
      WHERE tour_id = $1
      ORDER BY step_order ASC
      `,
      [id]
    );

    res.json({
      ...tourResult.rows[0],
      steps: stepsResult.rows,
    });
  } catch (err: any) {
    console.error('getTourById:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * UPDATE TOUR (TITLE ONLY)
 */
export const updateTour = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      `
      UPDATE tours
      SET title = COALESCE($1, title)
      WHERE id = $2 AND owner_id = $3
      RETURNING *
      `,
      [title, id, ownerId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Tour not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error('updateTour:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * DELETE SINGLE TOUR
 */
export const deleteTour = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      `
      DELETE FROM tours
      WHERE id = $1 AND owner_id = $2
      `,
      [id, ownerId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Tour not found or unauthorized' });
    }

    res.json({ msg: 'Tour deleted' });
  } catch (err: any) {
    console.error('deleteTour:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * DELETE ALL TOURS FOR LOGGED-IN USER
 */
export const deleteAllTours = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      `
      DELETE FROM tours
      WHERE owner_id = $1
      `,
      [ownerId]
    );

    res.json({
      msg: 'All tours deleted',
      deletedCount: result.rowCount,
    });
  } catch (err: any) {
    console.error('deleteAllTours:', err.message);
    res.status(500).send('Server Error');
  }
};
