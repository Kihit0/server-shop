import { Router } from 'express';
import Products from '../models/Products.js';

const productRouter = Router();

productRouter.post('/products', async (req, res) => {
  try {
    const { body } = req;

    if (!body.plu || !body.name) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    res.json(await Products.create(req.body));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

productRouter.get('/products', async (req, res) => {
  try {
    const { query } = req;
    if (!query.plu && !query.name) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    const products = await Products.findAll({
      where: query,
    });

    res.json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default productRouter;
