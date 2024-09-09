import { Router } from 'express';
import Stocks from '../models/Stocks.js';
import Products from '../models/Products.js';
import Api from '../api/core.js';

const stocksRouter = Router();
const api = new Api();

stocksRouter.post('/stocks', async (req, res) => {
  try {
    const { body } = req;
    if (!body.shop_id || !body.on_shelf || !body.in_order || !body.product_id) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    const stock = await Stocks.create(body);

    const { product_id, ...rest } = body;

    const product = await Products.findOne({
      where: {
        id: product_id,
      },
    });

    await api.createActions({
      ...rest,
      plu: product.plu,
      action: 'Adding product in stock',
    });

    res.json(stock);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

stocksRouter.patch('/stocks/:id/increase', async (req, res) => {
  try {
    const { params, body } = req;
    const stock = await Stocks.findByPk(params.id);

    if (!body.on_shelf && !body.in_order) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }

    if (stock.dataValues) {
      const dataStock = stock.dataValues;
      let nameIncrease;

      if (
        dataStock.on_shelf < body.on_shelf &&
        dataStock.in_order < body.in_order
      ) {
        nameIncrease = 'shelf and order';
      } else if (dataStock.on_shelf < dataStock.on_shelf) {
        nameIncrease = 'shelf';
      } else {
        nameIncrease = 'order';
      }

      if (body.on_shelf) {
        dataStock.on_shelf += body.on_shelf;
      }

      if (body.in_order) {
        dataStock.in_order += body.in_order;
      }

      const { product_id, shop_id, on_shelf, in_order } = dataStock;

      const product = await Products.findOne({
        where: {
          id: product_id,
        },
      });

      await api.createActions({
        shop_id,
        on_shelf,
        in_order,
        plu: product.dataValues.plu,
        action: `Increase ${nameIncrease}`,
      });

      await stock.save();

      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

stocksRouter.patch('/stocks/:id/decrease', async (req, res) => {
  try {
    const { params, body } = req;
    const stock = await Stocks.findByPk(params.id);

    if (!body.on_shelf && !body.in_order) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }

    if (
      body.on_shelf > stock.dataValues.on_shelf ||
      body.in_order > stock.dataValues.in_order
    ) {
      res.status(404).json({ message: 'Products cannot be less than 0' });
      return;
    }

    if (stock.dataValues) {
      const dataStock = stock.dataValues;
      let nameIncrease;

      if (
        dataStock.on_shelf < body.on_shelf &&
        dataStock.in_order < body.in_order
      ) {
        nameIncrease = 'shelf and order';
      } else if (dataStock.on_shelf < body.on_shelf) {
        nameIncrease = 'shelf';
      } else {
        nameIncrease = 'order';
      }

      if (body.on_shelf && body.on_shelf > dataStock.on_shelf) {
        dataStock.on_shelf -= body.on_shelf;
      }

      if (body.in_order) {
        dataStock.in_order -= body.in_order;
      }

      const { product_id, shop_id, on_shelf, in_order } = dataStock;

      const product = await Products.findOne({
        where: {
          id: product_id,
        },
      });

      await api.createActions({
        shop_id,
        on_shelf,
        in_order,
        plu: product.plu,
        action: `Decrease ${nameIncrease}`,
      });

      await stock.save();

      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

stocksRouter.get('/stocks', async (req, res) => {
  try {
    const { query } = req;

    if (!query.plu && !query.shop_id && !query.on_shelf && !query.in_order) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    const whereConditions = new Map();

    if (query.on_shelf || query.in_order) {
      const onShelf = query.on_shelf?.split(',').map(Number);
      const inOrder = query.in_order?.split(',').map(Number);

      if (
        (!onShelf || onShelf.length !== 2) &&
        (!inOrder || inOrder.length !== 2)
      ) {
        res.status(400).json({ message: 'Bad request' });
        return;
      }

      if (onShelf) {
        whereConditions.set('on_shelf', {
          [Op.between]: [Math.min(...onShelf), Math.max(...onShelf)],
        });
      }

      if (inOrder) {
        whereConditions.set('in_order', {
          [Op.between]: [Math.min(inOrder), Math.max(inOrder)],
        });
      }
    }

    if (query.plu) {
      const product = await Products.findOne({
        where: {
          plu: query.plu,
        },
      });

      whereConditions.set('product_id', product.id);
    }

    const { plu, ...rest } = query;

    const where = {
      ...rest,
      ...Object.fromEntries(whereConditions),
    };

    const stock = await Stocks.findAll({
      where,
      include: Products,
    });

    res.json(stock);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default stocksRouter;
