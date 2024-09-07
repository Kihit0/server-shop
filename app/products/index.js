import dotenv from 'dotenv';
import express from 'express';
import sequelize from './src/models/index.js';
import bodyParser from 'body-parser';
import Products from './src/models/Products.js';
import Stocks from './src/models/Stocks.js';
import { Op } from 'sequelize';

dotenv.config();

const PORT = process.env.PORT_PRODUCTS || 3000;

const app = express();
app.use(bodyParser.json());

sequelize.sync();

/* Associations */
Products.hasOne(Stocks);
Stocks.belongsTo(Products, {
  foreignKey: {
    name: 'product_id',
  },
});

app.post('/products', async (req, res) => {
  try {
    const { body } = req;

    if (!body.plu || !body.name) {
      res.status(400).json({ message: 'Bad request' });
    }

    res.json(await Products.create(req.body));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const { query } = req;
    if (!query.plu && !query.name) {
      res.status(400).json({ message: 'Bad request' });
    }

    const products = await Products.findAll({
      where: query,
    });

    res.json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.post('/stocks', async (req, res) => {
  try {
    const { body } = req;
    if (!body.shop_id || !body.on_shelf || !body.in_order || !body.product_id) {
      res.status(400).json({ message: 'Bad request' });
    }

    const stock = await Stocks.create(body);
    res.json(stock);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.patch('/stocks/:id/increase', async (req, res) => {
  try {
    const { params, body } = req.params;
    const stock = await Stocks.findByPk(params.id);

    if (!body.on_shelf && !body.in_order) {
      res.status(404).json({ message: 'Stock not found' });
    }

    if (stock) {
      stock.on_shelf += body.on_shelf;
      stock.in_order += body.in_order;

      await stock.save();

      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.patch('/stocks/:id/decrease', async (req, res) => {
  try {
    const { params, body } = req.params;
    const stock = await Stocks.findByPk(params.id);

    if (!body.on_shelf && !body.in_order) {
      res.status(404).json({ message: 'Stock not found' });
    }

    if (stock) {
      stock.on_shelf -= body.on_shelf;
      stock.in_order -= body.in_order;

      await stock.save();

      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get('/stocks', async (req, res) => {
  try {
    const { query } = req;

    if (!query.plu && !query.shop_id && !query.on_shelf && !query.in_order) {
      res.status(400).json({ message: 'Bad request' });
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

app.listen(PORT, '0.0.0.0');
