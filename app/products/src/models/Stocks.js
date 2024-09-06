import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class Stocks extends Model {}

Stocks.init(
  {
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    on_shelf: {
      type: DataTypes.INTEGER,
      allowNull: null,
    },
    in_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
  },
);

export default Stocks;
