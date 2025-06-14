// src/routes/usuario.js
const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { Op } = require('sequelize');
const authMiddleware = require('../middleware/authMiddleware');



const router = new Router({ prefix: '/auth' });

// Ruta para actualizar perfil
router.put('/perfil', authMiddleware, async (ctx) => {
  const id = ctx.state.user.id;
  const {
    nombre,
    correo,
    nombre_usuario,
    nueva_contrasena,
    contrasena_actual
  } = ctx.request.body;

  // Buscar usuario
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    ctx.status = 404;
    ctx.body = { error: 'Usuario no encontrado.' };
    return;
  }

  // Verificar contraseña actual
  const valid = await bcrypt.compare(contrasena_actual, usuario.contrasena);
  if (!valid) {
    ctx.status = 401;
    ctx.body = { error: 'Contraseña actual incorrecta.' };
    return;
  }

  // Actualizar campos si son distintos
  if (nombre && nombre !== usuario.nombre) usuario.nombre = nombre;
  if (correo && correo !== usuario.correo) usuario.correo = correo;
  if (nombre_usuario && nombre_usuario !== usuario.nombre_usuario) usuario.nombre_usuario = nombre_usuario;

  // Si hay nueva contraseña, hashearla
  if (nueva_contrasena && nueva_contrasena.length > 0) {
    const salt = await bcrypt.genSalt(10);
    usuario.contrasena = await bcrypt.hash(nueva_contrasena, salt);
  }

  await usuario.save();

  ctx.body = { message: 'Perfil actualizado correctamente.' };
});




// get para iniciar session y obtener el perfil del usuario por medio del token
router.get('/perfil', authMiddleware, async (ctx) => {
  const id = ctx.state.user.id;
  console.log("🧠 ID decodificado del token:", id);

  const user = await Usuario.findByPk(id, {
    attributes: ['id', 'nombre', 'nombre_usuario', 'correo', 'estadisticas', 'puntos_acumulados']
  });

  console.log("📦 Usuario encontrado:", user);

  if (!user) {
    ctx.status = 404;
    ctx.body = { error: 'Usuario no encontrado.' };
    return;
  }

  ctx.body = user;
});



// metodo post para login y registro listo
router.post('/', async (ctx) => {
  const { modo, nombre, correo, nombre_usuario, contrasena, repetir_contrasena } = ctx.request.body;

  if (modo === 'register') {
    console.log('🟢 Modo registro');

    console.log('Parámetros recibidos:', {
      modo,
      nombre,
      correo,
      nombre_usuario,
      contrasena,
      repetir_contrasena
    });
    // Validación básica
    if (!nombre || !correo || !nombre_usuario || !contrasena || !repetir_contrasena) {
      ctx.status = 400;
      ctx.body = { error: 'Faltan campos obligatorios para registrarse' };
      
      return;
    }

    if (contrasena !== repetir_contrasena) {
      ctx.status = 400;
      ctx.body = { error: 'Las contraseñas no coinciden' };
      return;
    }

    const existing = await Usuario.findOne({
      where: {
        [Op.or]: [{ correo }, { nombre_usuario }]
      }
    });

    if (existing) {
      ctx.status = 400;
      ctx.body = { error: 'Correo o nombre de usuario ya registrado' };
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      nombre_usuario,
      contrasena: hash,
      estadisticas: JSON.stringify({}), // Puede modificarse según formato real
      puntos_acumulados: 0
    });

    ctx.body = { message: 'Usuario creado con éxito', id: nuevoUsuario.id };

  } else if (modo === 'login') {
    console.log('🟢 Modo login');
    if (!nombre_usuario || !contrasena) {
      ctx.status = 400;
      ctx.body = { error: 'Faltan credenciales para iniciar sesión' };
      return;
    }

    const user = await Usuario.findOne({ where: { nombre_usuario } });

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    const valid = await bcrypt.compare(contrasena, user.contrasena);

    if (!valid) {
      ctx.status = 401;
      ctx.body = { error: 'Contraseña incorrecta' };
      return;
    }
    console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user.id, nombre_usuario: user.nombre_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    ctx.body = { message: 'Login exitoso', token };

  } else {
    console.log('🔴 Modo inválido:', modo);
    ctx.status = 400;
    ctx.body = { error: 'Modo inválido, debe ser "login" o "register"' };
  }
});


// Ruta para eliminar cuenta
router.delete('/perfil', authMiddleware, async (ctx) => {
  const id = ctx.state.user.id;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    ctx.status = 404;
    ctx.body = { error: 'Usuario no encontrado.' };
    return;
  }

  await usuario.destroy();
  ctx.body = { message: 'Perfil eliminado correctamente.' };
});


// obtener todos los usuarios
router.get('/', async (ctx) => {
  try {
    const usuarios = await Usuario.findAll();
    ctx.body = usuarios;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// obtener un usuario por id
router.get('/:id', async (ctx) => {
  try {
    const usuario = await Usuario.findByPk(ctx.params.id);
    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }
    ctx.body = usuario;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// crear un nuevo usuario
router.post('/', async (ctx) => {
  try {
    const nuevoUsuario = await Usuario.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = nuevoUsuario;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// actualizar un usuario existente
router.put('/:id', async (ctx) => {
  try {
    const usuario = await Usuario.findByPk(ctx.params.id);
    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }
    await usuario.update(ctx.request.body);
    ctx.body = usuario;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// eliminar un usuario
router.delete('/:id', async (ctx) => {
  try {
    const usuario = await Usuario.findByPk(ctx.params.id);
    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }
    await usuario.destroy();
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = router;
