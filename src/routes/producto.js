const Router = require('koa-router');
const { Producto } = require('../models');

const router = new Router();

// obtener todos los productos
router.get('/', async (ctx) => {
  try {
    const productos = await Producto.findAll();
    ctx.body = productos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// obtener producto por id
router.get('/:id', async (ctx) => {
  try {
    const producto = await Producto.findByPk(ctx.params.id);
    if (!producto) {
      ctx.status = 404;
      ctx.body = { error: 'Producto no encontrado' };
      return;
    }
    ctx.body = producto;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// crear nuevo producto
router.post('/', async (ctx) => {
  try {
    const nuevoProducto = await Producto.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = nuevoProducto;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// actualizar producto existente
router.put('/:id', async (ctx) => {
  try {
    const producto = await Producto.findByPk(ctx.params.id);
    if (!producto) {
      ctx.status = 404;
      ctx.body = { error: 'Producto no encontrado' };
      return;
    }
    await producto.update(ctx.request.body);
    ctx.body = producto;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// eliminar producto
router.delete('/:id', async (ctx) => {
  try {
    const producto = await Producto.findByPk(ctx.params.id);
    if (!producto) {
      ctx.status = 404;
      ctx.body = { error: 'Producto no encontrado' };
      return;
    }
    await producto.destroy();
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = router;
