import express, { Request, Response } from 'express';
import ProductAction from '../models/ProductAction';
import { Op } from 'sequelize';

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { shop_id, plu, start_date, end_date, action, page = 1, limit = 10 } = req.query

    const filters: any = {}

    if (shop_id) filters.shop_id = shop_id
    if (plu) filters.product_id = plu
    if (start_date || end_date) {
      filters.timestamp = {
        [Op.between]: [
          new Date(String(start_date || '1970-01-01')),
          new Date(String(end_date || '9999-12-31')) 
        ],
      };
    }
    if (action) filters.action = action;

    const productActions = await ProductAction.findAndCountAll({
      where: filters,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });

    res.json({
      data: productActions.rows,
      total: productActions.count,
      page: Number(page),
      totalPages: Math.ceil(productActions.count / Number(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product actions' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { action, product_id, shop_id, quantity_change } = req.body;

    const newAction = await ProductAction.create({
      action,
      product_id,
      shop_id,
      quantity_change,
    });

    res.status(201).json(newAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating product action' });
  }
});

export default router;
