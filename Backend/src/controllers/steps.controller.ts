import { Request, Response } from 'express';
import db from '../db';

export const addStepToTour = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  const userId = req.user?.id;
  const { caption, image_url } = req.body;
  try {
    const tourResult = await db.query('SELECT id FROM tours WHERE id = $1 AND owner_id = $2', [tourId, userId]);
    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found or you do not have permission to edit it' });
    }
    const orderResult = await db.query('SELECT MAX(order_index) as max_order FROM steps WHERE tour_id = $1', [tourId]);
    const newOrderIndex = (orderResult.rows[0].max_order === null) ? 0 : orderResult.rows[0].max_order + 1;
    const newStep = await db.query('INSERT INTO steps (tour_id, order_index, caption, image_url) VALUES ($1, $2, $3, $4) RETURNING *', [tourId, newOrderIndex, caption, image_url]);
    res.status(201).json(newStep.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateStep = async (req: Request, res: Response) => {
  const { tourId, stepId } = req.params;
  const userId = req.user?.id;
  const { caption, image_url, order_index } = req.body;
  try {
    const stepResult = await db.query(
      `SELECT s.* FROM steps s 
       JOIN tours t ON s.tour_id = t.id 
       WHERE s.id = $1 AND s.tour_id = $2 AND t.owner_id = $3`,
      [stepId, tourId, userId]
    );
    if (stepResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Step not found or you do not have permission to edit it' });
    }
    const currentStep = stepResult.rows[0];
    const newCaption = caption !== undefined ? caption : currentStep.caption;
    const newImageUrl = image_url !== undefined ? image_url : currentStep.image_url;
    const newOrderIndex = order_index !== undefined ? order_index : currentStep.order_index;
    const updatedStep = await db.query('UPDATE steps SET caption = $1, image_url = $2, order_index = $3 WHERE id = $4 RETURNING *', [newCaption, newImageUrl, newOrderIndex, stepId]);
    res.status(200).json(updatedStep.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteStep = async (req: Request, res: Response) => {
  const { tourId, stepId } = req.params;
  const userId = req.user?.id;
  try {
    const deleteResult = await db.query(
      `DELETE FROM steps s USING tours t 
       WHERE s.id = $1 AND s.tour_id = t.id AND s.tour_id = $2 AND t.owner_id = $3`,
      [stepId, tourId, userId]
    );
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ msg: 'Step not found or you do not have permission to delete it' });
    }
    res.status(200).json({ msg: 'Step successfully deleted' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteAllStepsForTour = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  const userId = req.user?.id;
  try {
    const tourResult = await db.query('SELECT id FROM tours WHERE id = $1 AND owner_id = $2', [tourId, userId]);
    if (tourResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Tour not found or you do not have permission to edit it' });
    }
    await db.query('DELETE FROM steps WHERE tour_id = $1', [tourId]);
    res.status(200).json({ msg: 'Steps cleared successfully' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};