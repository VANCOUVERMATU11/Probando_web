const jwt = require('jsonwebtoken');

const authMiddleware = async (ctx, next) => {
  const authHeader = ctx.headers['authorization'];

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: 'No autorizado: falta el token.' };
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = payload; // Deja disponible: id y nombre_usuario
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Token inválido o expirado.' };
  }
};

module.exports = authMiddleware;
