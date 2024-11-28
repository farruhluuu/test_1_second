import { DataTypes } from 'sequelize';
import sequelize from '../db';

const ProductAction = sequelize.define('ProductAction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  quantity_change: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default ProductAction;
