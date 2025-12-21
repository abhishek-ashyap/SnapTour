import { Request, Response } from 'express';
import db from '../db';

/**
 * ADD STEP
 */
export const addStepToTour = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  const userId = req.user?.id;
  const { caption, image_url, step_order } = req.body;

  try {
    const tourCheck = await db.query(
      'SELECT id FROM tours WHERE id = $1 AND owner_id = $2',
      [tourId, userId]
    );

    if (tourCheck.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found or unauthorized' });
    }

    const result = await db.query(
      `
      INSERT INTO steps (tour_id, caption, image_url, step_order)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        tourId,
        caption ?? '',          // ✅ prevents NOT NULL crash
        image_url ?? null,
        step_order ?? 0,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('addStepToTour:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * UPDATE STEP
 */
export const updateStep = async (req: Request, res: Response) => {
  const { tourId, stepId } = req.params;
  const userId = req.user?.id;
  const { caption, image_url, step_order } = req.body;

  try {
    const result = await db.query(
      `
      UPDATE steps s
      SET caption = COALESCE($1, caption),
          image_url = COALESCE($2, image_url),
          step_order = COALESCE($3, step_order)
      FROM tours t
      WHERE s.id = $4
        AND s.tour_id = t.id
        AND t.id = $5
        AND t.owner_id = $6
      RETURNING s.*
      `,
      [caption, image_url, step_order, stepId, tourId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Step not found or unauthorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    console.error('updateStep:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * DELETE STEP
 */
export const deleteStep = async (req: Request, res: Response) => {
  const { tourId, stepId } = req.params;
  const userId = req.user?.id;

  try {
    const result = await db.query(
      `
      DELETE FROM steps s
      USING tours t
      WHERE s.id = $1
        AND s.tour_id = t.id
        AND t.id = $2
        AND t.owner_id = $3
      `,
      [stepId, tourId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Step not found or unauthorized' });
    }

    res.status(200).json({ msg: 'Step deleted' });
  } catch (err: any) {
    console.error('deleteStep:', err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * DELETE ALL STEPS
 */
export const deleteAllStepsForTour = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  const userId = req.user?.id;

  try {
    const tourCheck = await db.query(
      'SELECT id FROM tours WHERE id = $1 AND owner_id = $2',
      [tourId, userId]
    );

    if (tourCheck.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found or unauthorized' });
    }

    await db.query('DELETE FROM steps WHERE tour_id = $1', [tourId]);
    res.status(200).json({ msg: 'All steps deleted' });
  } catch (err: any) {
    console.error('deleteAllStepsForTour:', err.message);
    res.status(500).send('Server Error');
  }
};
