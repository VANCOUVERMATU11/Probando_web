'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccionBenefica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AccionBenefica.hasMany(models.HistorialAcciones, { foreignKey: 'AccionBeneficaId' });
    }
  }
  AccionBenefica.init({
    foto: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    nombre: DataTypes.STRING,
    costo: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'AccionBenefica',
  });
  return AccionBenefica;
};