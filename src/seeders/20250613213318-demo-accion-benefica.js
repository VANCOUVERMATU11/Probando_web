'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * accionbenefica tiene:
        foto: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        nombre: DataTypes.STRING,
        costo: DataTypes.INTEGER,
        fecha: DataTypes.DATE,
    */
    await queryInterface.bulkInsert('AccionBeneficas', [{
      foto: 'https://t3.ftcdn.net/jpg/01/22/60/62/360_F_122606258_iVkuu00YHjlAe5xGzrrC3Rta8pEklAfJ.jpg',
      descripcion: 'Plantar un árbol en el parque local para mejorar el medio ambiente y la calidad del aire.',
      nombre: 'Plantar un Árbol',
      costo: 100,
    }, {
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Soft_focus_example_picture_2.jpg/1024px-Soft_focus_example_picture_2.jpg',
      descripcion: 'Un almuerzo para personas sin hogar',
      nombre: 'Almuerzo Solidario',
      costo: 200,
    }, {
      foto: 'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/cuboid-3d-shapes-twinkl-maths-wiki2_ver_1.png',
      descripcion: 'Donar ropa usada a un refugio local para ayudar a quienes más lo necesitan.',
      nombre: 'Donación de Ropa',
      costo: 300,
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
