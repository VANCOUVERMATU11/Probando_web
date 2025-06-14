'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carrito.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Carrito.belongsToMany(models.Producto, {
                            through: models.CarritoProducto,
                            foreignKey: 'carritoId',
                            otherKey: 'productoId'
                          });
    }
  }
  Carrito.init({
    usuarioId: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrito',
  });
  return Carrito;
};