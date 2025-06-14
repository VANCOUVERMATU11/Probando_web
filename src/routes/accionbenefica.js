const Router = require('koa-router');
const { AccionBenefica } = require('../models');

const router = new Router();

// DELETE, PUT, POST, GET para historial de acciones
// Ruta para crear una acción benéfica
router.post('/accion-benefica', async (ctx) => {
  const { nombre, descripcion, fecha } = ctx.request.body;

  // Validar campos requeridos
  if (!nombre || !descripcion || !fecha) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos.' };
    return;
  }

  // Crear acción benéfica
  try {
    const nuevaAccion = await AccionBenefica.create({
      nombre,
      descripcion,
      fecha
    });
    ctx.status = 201;
    ctx.body = nuevaAccion;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});
// Ruta para obtener todas las acciones benéficas
router.get('/accion-benefica', async (ctx) => {
  try {
    const acciones = await AccionBenefica.findAll();
    ctx.body = acciones;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener las acciones benéficas.' };
  }
}
);
// Ruta para obtener una acción benéfica por ID
router.get('/accion-benefica/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const accion = await AccionBenefica.findByPk(id);
    if (!accion) {
      ctx.status = 404;
      ctx.body = { error: 'Acción benéfica no encontrada.' };
      return;
    }
    ctx.body = accion;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener la acción benéfica.' };
  }
});
// Ruta para actualizar una acción benéfica
router.put('/accion-benefica/:id', async (ctx) => {
  const { id } = ctx.params;
  const { nombre, descripcion, fecha } = ctx.request.body;

  try {
    const accion = await AccionBenefica.findByPk(id);
    if (!accion) {
      ctx.status = 404;
      ctx.body = { error: 'Acción benéfica no encontrada.' };
      return;
    }

    // Actualizar campos
    accion.nombre = nombre || accion.nombre;
    accion.descripcion = descripcion || accion.descripcion;
    accion.fecha = fecha || accion.fecha;

    await accion.save();
    ctx.body = accion;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});
// Ruta para eliminar una acción benéfica
router.delete('/accion-benefica/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const accion = await AccionBenefica.findByPk(id);
    if (!accion) {
      ctx.status = 404;
      ctx.body = { error: 'Acción benéfica no encontrada.' };
      return;
    }

    await accion.destroy();
    ctx.status = 204; // No content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar la acción benéfica.' };
  }
});
module.exports = router;