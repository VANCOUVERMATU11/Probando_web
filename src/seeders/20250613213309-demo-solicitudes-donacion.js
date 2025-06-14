'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * solicituddonacion tiene:
        usuarioId: DataTypes.INTEGER,
        fecha_solicitud: DataTypes.DATE,
        estado_revision: DataTypes.STRING,
        imagen: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        nombre_producto: DataTypes.STRING
    */
    await queryInterface.bulkInsert('SolicitudDonacions', [{
      usuarioId: 1,
      fecha_solicitud: new Date(),
      estado_revision: 'pendiente',
      imagen: 'https://lavozdemaipu.cl/wp-content/uploads/2024/03/WhatsApp-Image-2022-08-24-at-2.42.20-PM-2-1.jpeg',
      descripcion: 'Donación de ropa usada en buen estado.',
      nombre_producto: 'Ropa usada'
    }, {
      usuarioId: 2,
      fecha_solicitud: new Date(),
      estado_revision: 'aprobada',
      imagen: 'https://www.tiendalego.cl/cdn/shop/products/40649_prod_1000x1000.jpg?v=1745257574',
      descripcion: 'Donación de juguetes para niños.',
      nombre_producto: 'Lego'
    }, {
      usuarioId: 3,
      fecha_solicitud: new Date(),
      estado_revision: 'rechazada',
      imagen: 'https://lavozdelaconcagua.cl/wp-content/uploads/2020/05/CANASTA.jpg',
      descripcion: 'Donación de alimentos no perecibles.',
      nombre_producto: 'Alimentos no perecbiles'
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
