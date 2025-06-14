const Router = require('koa-router');
const { PedidoProducto } = require('../models');

const router = new Router();

// DELETE, PUT, POST, GET para PedidoProducto
// Ruta para crear un PedidoProducto
router.post('/pedido-producto', async (ctx) => {
  const { pedidoId, productoId, cantidad } = ctx.request.body;

  // Validar campos requeridos
  if (!pedidoId || !productoId || !cantidad) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos.' };
    return;
  }

  // Crear PedidoProducto
  const nuevoPedidoProducto = await PedidoProducto.create({
    pedidoId,
    productoId,
    cantidad
  });

  ctx.status = 201;
  ctx.body = nuevoPedidoProducto;
});
// Ruta para obtener todos los PedidoProducto
router.get('/pedido-productos', async (ctx) => {
  try {
    const pedidoProductos = await PedidoProducto.findAll();
    ctx.body = pedidoProductos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener los productos del pedido.' };
  }
});
// Ruta para obtener un PedidoProducto por ID       
router.get('/pedido-producto/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const pedidoProducto = await PedidoProducto.findByPk(id);
    if (!pedidoProducto) {
      ctx.status = 404;
      ctx.body = { error: 'PedidoProducto no encontrado.' };
      return;
    }
    ctx.body = pedidoProducto;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener el PedidoProducto.' };
  }
});
// Ruta para actualizar un PedidoProducto
router.put('/pedido-producto/:id', async (ctx) => {
  const { id } = ctx.params;
  const { pedidoId, productoId, cantidad } = ctx.request.body;

  try {
    const pedidoProducto = await PedidoProducto.findByPk(id);
    if (!pedidoProducto) {
      ctx.status = 404;
      ctx.body = { error: 'PedidoProducto no encontrado.' };
      return;
    }

    // Actualizar PedidoProducto
    await pedidoProducto.update({ pedidoId, productoId, cantidad });
    ctx.body = pedidoProducto;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});
// Ruta para eliminar un PedidoProducto
router.delete('/pedido-producto/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const pedidoProducto = await PedidoProducto.findByPk(id);
    if (!pedidoProducto) {
      ctx.status = 404;
      ctx.body = { error: 'PedidoProducto no encontrado.' };
      return;
    }

    // Eliminar PedidoProducto
    await pedidoProducto.destroy();
    ctx.status = 204; // No Content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar el PedidoProducto.' };
  }
});


module.exports = router;