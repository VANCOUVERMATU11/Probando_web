'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PedidoProducto.belongsTo(models.Pedido, { foreignKey: 'pedidoId' });
      PedidoProducto.belongsTo(models.Producto, { foreignKey: 'productoId' });

    }
  }
  PedidoProducto.init({
    pedidoId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PedidoProducto',
  });
  return PedidoProducto;
};