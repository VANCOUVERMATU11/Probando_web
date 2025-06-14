'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SolicitudDonacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SolicitudDonacion.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    }
  }
  SolicitudDonacion.init({
    usuarioId: DataTypes.INTEGER,
    fecha_solicitud: DataTypes.DATE,
    estado_revision: DataTypes.STRING,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    nombre_producto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SolicitudDonacion',
  });
  return SolicitudDonacion;
};