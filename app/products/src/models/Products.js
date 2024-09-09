import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class Products extends Model {}

Products.init(
  {
    plu: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize },
);

export default Products;
