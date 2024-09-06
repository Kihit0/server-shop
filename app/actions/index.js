import dotenv from 'dotenv';
import express from 'express';
import sequelize from './models/index.js';
import bodyParser from 'body-parser';

dotenv.config();

const PORT = process.env.PORT_ACTIONS || 3001;

const app = express();
app.use(bodyParser.json());

sequelize.sync();

app.listen(PORT, () => {
  console.log('WORK');
});
