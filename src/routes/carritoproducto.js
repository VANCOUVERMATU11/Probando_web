const Router = require('koa-router');
const { CarritoProducto } = require('../models');

const router = new Router();
// DELETE, PUT, POST, GET para hcarrito de productos

// Ruta para crear un carrito de productos
router.post('/carrito-productos', async (ctx) => {
  const { usuarioId, productoId, cantidad } = ctx.request.body;

  // Validar campos requeridos
  if (!usuarioId || !productoId || !cantidad) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos.' };
    return;
  }

  // Crear carrito de productos
  const nuevoCarritoProducto = await CarritoProducto.create({
    usuarioId,
    productoId,
    cantidad
  });

  ctx.status = 201;
  ctx.body = nuevoCarritoProducto;
});
// Ruta para obtener todos los carritos de productos
router.get('/carrito-productos', async (ctx) => {
  try {
    const carritos = await CarritoProducto.findAll();
    ctx.body = carritos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener los carritos de productos.' };
  }
}
);
// Ruta para obtener un carrito de productos por ID
router.get('/carrito-producto/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const carritoProducto = await CarritoProducto.findByPk(id);
    if (!carritoProducto) {
      ctx.status = 404;
      ctx.body = { error: 'Carrito de productos no encontrado.' };
      return;
    }
    ctx.body = carritoProducto;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener el carrito de productos.' };
  }
});
// Ruta para actualizar un carrito de productos
router.put('/carrito-producto/:id', async (ctx) => {
  const { id } = ctx.params;
  const { usuarioId, productoId, cantidad } = ctx.request.body;

  try {
    const carritoProducto = await CarritoProducto.findByPk(id);
    if (!carritoProducto) {
      ctx.status = 404;
      ctx.body = { error: 'Carrito de productos no encontrado.' };
      return;
    }

    // Actualizar carrito de productos
    carritoProducto.usuarioId = usuarioId || carritoProducto.usuarioId;
    carritoProducto.productoId = productoId || carritoProducto.productoId;
    carritoProducto.cantidad = cantidad || carritoProducto.cantidad;

    await carritoProducto.save();

    ctx.body = carritoProducto;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar el carrito de productos.' };
  }
});
// Ruta para eliminar un carrito de productos
router.delete('/carrito-producto/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const carritoProducto = await CarritoProducto.findByPk(id);
    if (!carritoProducto) {
      ctx.status = 404;
      ctx.body = { error: 'Carrito de productos no encontrado.' };
      return;
    }

    await carritoProducto.destroy();
    ctx.status = 204; // No Content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar el carrito de productos.' };
  }
});


module.exports = router;