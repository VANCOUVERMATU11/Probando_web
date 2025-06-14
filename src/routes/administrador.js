const Router = require('koa-router');
const { Administrador } = require('../models');

const router = new Router();

// obtener todos los administradores

// DELETE, PUT, POST, GET para historial de acciones
// Ruta para crear un administrador
router.post('/', async (ctx) => {
  const { nombre_usuario } = ctx.request.body;

  // Validar campos requeridos
  if (!nombre_usuario) {
    ctx.status = 400;
    ctx.body = { error: 'El nombre de usuario es requerido.' };
    return;
  }
  // Crear administrador
  try {
    const nuevoAdministrador = await Administrador.create({
      nombre_usuario
    });
    ctx.status = 201;
    ctx.body = nuevoAdministrador;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}
);
router.get('/', async (ctx) => {
  try {
    const admins = await Administrador.findAll({
      attributes: ['nombre_usuario']
    });
    ctx.body = admins;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// Ruta para obtener un administrador por ID
router.get('/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const administrador = await Administrador.findByPk(id, {
      attributes: ['nombre_usuario']
    });
    if (!administrador) {
      ctx.status = 404;
      ctx.body = { error: 'Administrador no encontrado.' };
      return;
    }
    ctx.body = administrador;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});
// Ruta para actualizar un administrador
router.put('/:id', async (ctx) => {
  const { id } = ctx.params;
  const { nombre_usuario } = ctx.request.body;

  try {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) {
      ctx.status = 404;
      ctx.body = { error: 'Administrador no encontrado.' };
      return;
    }
    // Actualizar administrador
    administrador.nombre_usuario = nombre_usuario;
    await administrador.save();
    ctx.body = administrador;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});
// Ruta para eliminar un administrador
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) {
      ctx.status = 404;
      ctx.body = { error: 'Administrador no encontrado.' };
      return;
    }
    // Eliminar administrador
    await administrador.destroy();
    ctx.status = 204; // No content
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = router;