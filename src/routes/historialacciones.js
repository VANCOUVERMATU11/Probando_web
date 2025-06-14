const Router = require('koa-router');
const { HistorialAcciones } = require('../models');

const router = new Router();
// DELETE, PUT, POST, GET para historial de acciones
// Ruta para crear un historial de acciones
router.post('/historial-acciones', async (ctx) => {
  const { usuarioId, accion, descripcion, fecha } = ctx.request.body;

  // Validar campos requeridos
  if (!usuarioId || !accion || !descripcion || !fecha) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos.' };
    return;
  }

  // Crear historial de acciones
  const nuevoHistorial = await HistorialAcciones.create({
    usuarioId,
    accion,
    descripcion,
    fecha
  });

  ctx.status = 201;
  ctx.body = nuevoHistorial;
});
// Ruta para obtener todos los historiales de acciones
router.get('/historial-acciones', async (ctx) => {
  try {
    const historiales = await HistorialAcciones.findAll();
    ctx.body = historiales;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener los historiales de acciones.' };
  }
});
// Ruta para obtener un historial de acciones por ID
router.get('/historial-accion/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const historial = await HistorialAcciones.findByPk(id);
    if (!historial) {
      ctx.status = 404;
      ctx.body = { error: 'Historial de acciones no encontrado.' };
      return;
    }
    ctx.body = historial;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener el historial de acciones.' };
  }
});
// Ruta para actualizar un historial de acciones
router.put('/historial-accion/:id', async (ctx) => {
  const { id } = ctx.params;
  const { usuarioId, accion, descripcion, fecha } = ctx.request.body;

  try {
    const historial = await HistorialAcciones.findByPk(id);
    if (!historial) {
      ctx.status = 404;
      ctx.body = { error: 'Historial de acciones no encontrado.' };
      return;
    }

    // Actualizar historial de acciones
    historial.usuarioId = usuarioId;
    historial.accion = accion;
    historial.descripcion = descripcion;
    historial.fecha = fecha;

    await historial.save();
    ctx.body = historial;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar el historial de acciones.' };
  }
});
// Delete un historial de acciones
router.delete('/historial-accion/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const historial = await HistorialAcciones.findByPk(id);
    if (!historial) {
      ctx.status = 404;
      ctx.body = { error: 'Historial de acciones no encontrado.' };
      return;
    }

    await historial.destroy();
    ctx.status = 204; // No Content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar el historial de acciones.' };
  }
});
module.exports = router;