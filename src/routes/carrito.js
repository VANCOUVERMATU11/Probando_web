const Router = require('koa-router');
const { Carrito } = require('../models');

const router = new Router();

// DELETE, PUT, POST, GET para carrito
// Ruta para crear un carrito
router.post('/carrito', async (ctx) => {
  const { usuarioId, productos } = ctx.request.body;

  // Validar campos requeridos
  if (!usuarioId || !productos || !Array.isArray(productos)) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos y productos debe ser un array.' };
    return;
  }

  // Crear carrito
  const nuevoCarrito = await Carrito.create({
    usuarioId,
    productos: JSON.stringify(productos) // Guardar productos como JSON
  });

  ctx.status = 201;
  ctx.body = nuevoCarrito;
});
// Ruta para obtener todos los carritos
router.get('/carrito', async (ctx) => {
  try {
    const carritos = await Carrito.findAll();
    ctx.body = carritos;
  } catch (error) {
    ctx.status = 500;   
    ctx.body = { error: 'Error al obtener los carritos.' };
    }   
}
);
// Ruta para obtener un carrito por ID
router.get('/carrito/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      ctx.status = 404;
      ctx.body = { error: 'Carrito no encontrado.' };
      return;
    }
    ctx.body = carrito;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener el carrito.' };
  }
});
// Ruta para actualizar un carrito
router.put('/carrito/:id', async (ctx) => {
  const { id } = ctx.params;
  const { usuarioId, productos } = ctx.request.body;

  try {
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      ctx.status = 404;
      ctx.body = { error: 'Carrito no encontrado.' };
      return;
    }

    // Actualizar carrito
    carrito.usuarioId = usuarioId || carrito.usuarioId;
    carrito.productos = JSON.stringify(productos) || carrito.productos;

    await carrito.save();

    ctx.body = carrito;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar el carrito.' };
  }
});
// Ruta para eliminar un carrito
router.delete('/carrito/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      ctx.status = 404;
      ctx.body = { error: 'Carrito no encontrado.' };
      return;
    }

    await carrito.destroy();
    ctx.status = 204; // No content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar el carrito.' };
  }
});
module.exports = router;