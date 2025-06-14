const Router = require('koa-router');
const { SolicitudDonacion } = require('../models');

const router = new Router();

// Ruta para crear una solicitud de donación
router.post('/solicitud', async (ctx) => {
  const { titulo, descripcion, cantidad_necesaria } = ctx.request.body;

  // Validar campos requeridos
  if (!titulo || !descripcion || !cantidad_necesaria) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son requeridos.' };
    return;
  }

  // Crear solicitud de donación
  const nuevaSolicitud = await SolicitudDonacion.create({
    titulo,
    descripcion,
    cantidad_necesaria
  });

  ctx.status = 201;
  ctx.body = nuevaSolicitud;
});

// Ruta para obtener todas las solicitudes de donación
router.get('/solicitud', async (ctx) => {
  try {
    const solicitudes = await SolicitudDonacion.findAll();
    ctx.body = solicitudes;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener las solicitudes de donación.' };
  }
}
);
// Ruta para obtener una solicitud de donación por ID
router.get('/solicitud/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const solicitud = await SolicitudDonacion.findByPk(id);
    if (!solicitud) {
      ctx.status = 404;
      ctx.body = { error: 'Solicitud de donación no encontrada.' };
      return;
    }
    ctx.body = solicitud;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener la solicitud de donación.' };
  }
});


// Ruta para actualizar una solicitud de donación
router.put('/solicitud/:id', async (ctx) => {
  const { id } = ctx.params;
  const { titulo, descripcion, cantidad_necesaria } = ctx.request.body;

  try {
    const solicitud = await SolicitudDonacion.findByPk(id);
    if (!solicitud) {
      ctx.status = 404;
      ctx.body = { error: 'Solicitud de donación no encontrada.' };
      return;
    }

    // Actualizar campos si están presentes
    if (titulo) solicitud.titulo = titulo;
    if (descripcion) solicitud.descripcion = descripcion;
    if (cantidad_necesaria) solicitud.cantidad_necesaria = cantidad_necesaria;

    await solicitud.save();
    ctx.body = solicitud;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar la solicitud de donación.' };
  }
});
// Ruta para eliminar una solicitud de donación
router.delete('/solicitud/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const solicitud = await SolicitudDonacion.findByPk(id);
    if (!solicitud) {
      ctx.status = 404;
      ctx.body = { error: 'Solicitud de donación no encontrada.' };
      return;
    }

    await solicitud.destroy();
    ctx.status = 204; // No content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar la solicitud de donación.' };
  }
});

module.exports = router;