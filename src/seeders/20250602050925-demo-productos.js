'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productos', [{
      nombre: "Poster de Capitán Garfio",
      descripcion: "Un poster de alta calidad del Capitán Garfio, ideal para decorar tu habitación o estudio.",
      precio: 3500,
      foto: "https://res.cloudinary.com/dqfwzgoxt/image/upload/v1748840706/3-Captain-Hook_tjohlu.jpg",
      categoria: "Pósteres",
      palabras_clave: "capitán garfio, poster, decoración, habitación, estudio",
      puntos_ambientales: 15
    }, {
      nombre: "Mueble de Ikea",
      descripcion: "Un mueble de Ikea, funcional y elegante, perfecto para cualquier espacio.",
      precio: 150000,
      foto: "https://res.cloudinary.com/dqfwzgoxt/image/upload/v1748841581/1_d9f72s.avif",
      categoria: "Muebles",
      palabras_clave: "mueble, ikea, funcional, elegante, espacio",
      puntos_ambientales: 20
    },{
      nombre: "Camiseta de Star Wars",
      descripcion: "Camiseta de alta calidad con diseño exclusivo de Star Wars, perfecta para los fanáticos de la saga.",
      precio: 5000,
      foto: "https://res.cloudinary.com/dqfwzgoxt/image/upload/v1749850127/1_t7u07h.jpg",
      categoria: "Ropa",
      palabras_clave: "camiseta, star wars, fanáticos, saga, diseño exclusivo",
      puntos_ambientales: 10
    }, {
      nombre: "Libro de Harry Potter",
      descripcion: "Un libro de la saga Harry Potter, ideal para los amantes de la lectura y la magia.",
      precio: 8000,
      foto: "https://res.cloudinary.com/dqfwzgoxt/image/upload/v1749850725/2_dhoxrb.webp",
      categoria: "Libros",
      palabras_clave: "libro, harry potter, saga, lectura, magia",
      puntos_ambientales: 5
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};

