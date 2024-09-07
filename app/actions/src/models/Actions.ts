import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Actions extends Model {}

Actions.init(
  {
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    on_shelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize },
);

export default Actions;
