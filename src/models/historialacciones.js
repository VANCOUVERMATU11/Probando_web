'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistorialAcciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HistorialAcciones.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      HistorialAcciones.belongsTo(models.AccionBenefica, { foreignKey: 'AccionBeneficaId' });
    }
  }
  HistorialAcciones.init({
    usuarioId: DataTypes.INTEGER,
    AccionBeneficaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistorialAcciones',
  });
  return HistorialAcciones;
};