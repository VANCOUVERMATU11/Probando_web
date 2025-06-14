const Router = require('koa-router');
const { Pedido } = require('../models');

const router = new Router();
// DELETE, PUT, POST, GET para Pedido
// Ruta para crear un Pedido
router.post('/pedido', async (ctx) => {
  const { usuarioId, total, estado } = ctx.request.body;

  // Validar campos requeridos
  if (!usuarioId || !total || !estado) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos.' };
    return;
  }

  // Crear Pedido
  const nuevoPedido = await Pedido.create({
    usuarioId,
    total,
    estado
  });

  ctx.status = 201;
  ctx.body = nuevoPedido;
});
// Ruta para obtener todos los Pedidos
router.get('/pedidos', async (ctx) => {
  try {
    const pedidos = await Pedido.findAll();
    ctx.body = pedidos;
  } catch (error) {
    ctx.status
    = 500;
    ctx.body = { error: 'Error al obtener los pedidos.' };
    }
}
);
// Ruta para obtener un Pedido por ID
router.get('/pedido/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      ctx.status = 404;
      ctx.body = { error: 'Pedido no encontrado.' };
      return;
    }
    ctx.body = pedido;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener el pedido.' };
  }
});
// Ruta para actualizar un Pedido
router.put('/pedido/:id', async (ctx) => {
  const { id } = ctx.params;
  const { usuarioId, total, estado } = ctx.request.body;

  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      ctx.status = 404;
      ctx.body = { error: 'Pedido no encontrado.' };
      return;
    }
    await pedido.update({
      usuarioId,
      total,
      estado
    });
    ctx.body = pedido;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});
// Ruta para eliminar un Pedido
router.delete('/pedido/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      ctx.status = 404;
      ctx.body = { error: 'Pedido no encontrado.' };
      return;
    }
    await pedido.destroy();
    ctx.status = 204; // No Content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar el pedido.' };
  }
});
const { PedidoProducto } = require('../models');


module.exports = router;