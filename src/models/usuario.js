'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.HistorialAcciones, { foreignKey: 'usuarioId' });
      Usuario.hasOne(models.Carrito, { foreignKey: 'usuarioId' });
      Usuario.hasMany(models.Pedido, { foreignKey: 'usuarioId' });
      Usuario.hasMany(models.SolicitudDonacion, { foreignKey: 'usuarioId' });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    estadisticas: DataTypes.TEXT,
    puntos_acumulados: DataTypes.INTEGER,
    nombre_usuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};