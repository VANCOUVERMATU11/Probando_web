'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // https://sequelize.org/docs/v7/associations/belongs-to-many/
      Producto.belongsToMany(models.Carrito, {
                             through: models.CarritoProducto,
                             foreignKey: 'productoId',
                             otherKey: 'carritoId'
                            });

      Producto.belongsToMany(models.Pedido, {
                            through: models.PedidoProducto,
                            foreignKey: 'productoId',
                            otherKey: 'pedidoId'
                          });
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    palabras_clave: DataTypes.STRING,
    puntos_ambientales: DataTypes.INTEGER,
    descripcion: DataTypes.TEXT,
    foto: DataTypes.STRING,
    comprado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};