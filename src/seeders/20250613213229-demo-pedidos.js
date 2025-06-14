'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
    producto tiene:
    usuarioId: DataTypes.INTEGER,
    metodo_pago: DataTypes.STRING,
    lista_productos: DataTypes.JSON,
    estado: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    fecha: DataTypes.DATE
    */
   await queryInterface.bulkInsert('Pedidos', [{
      usuarioId: 1,
      metodo_pago: "Tarjeta de crédito",
      estado: "Pendiente",
      // Le doy la fecha actual
      fecha: new Date()
    }, {
      usuarioId: 2,
      metodo_pago: "PayPal",
      estado: "Completado",
      // Le doy la fecha actual
      fecha: new Date()
    }, {
      usuarioId: 3,
      metodo_pago: "Transferencia bancaria",
      estado: "Cancelado",
      // Le doy la fecha actual
      fecha: new Date()
    }], {});
  },
  
  async down (queryInterface, Sequelize) {
  }
};
