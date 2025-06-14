'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarritoProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CarritoProducto.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
      CarritoProducto.belongsTo(models.Producto, { foreignKey: 'productoId' });
    }
  }
  CarritoProducto.init({
    carritoId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CarritoProducto',
  });
  return CarritoProducto;
};