'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsToMany(models.Producto, {
                            through: models.PedidoProducto,
                            foreignKey: 'pedidoId',
                            otherKey: 'productoId'
                          });
      Pedido.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    }
  }
  Pedido.init({
    usuarioId: DataTypes.INTEGER,
    metodo_pago: DataTypes.STRING,
    estado: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};