const Router = require('koa-router');

const router = new Router();

// Importar los routers de recursos
const productos = require('./routes/producto');
const carritos = require('./routes/carrito');
const usuarios = require('./routes/usuario');
const acciones_beneficas = require('./routes/accionbenefica');
const administradores = require('./routes/administrador');
const carritoproductos = require('./routes/carritoproducto');
const historial_acciones = require('./routes/historialacciones');
const pedidos = require('./routes/pedido');
const pedido_productos = require('./routes/pedidoproducto');
const solicitudes_donaciones = require('./routes/solicituddonacion');


// Definir las rutas de los recursos
router.use('/productos', productos.routes());
router.use('/carritos', carritos.routes());
router.use(usuarios.routes());
router.use('/acciones_beneficas', acciones_beneficas.routes());
router.use('/administradores', administradores.routes());
router.use('/carritoproductos', carritoproductos.routes());
router.use('/historial_acciones', historial_acciones.routes());
router.use('/pedidos', pedidos.routes());
router.use('/pedido_productos', pedido_productos.routes());
router.use('/solicitudes_donaciones', solicitudes_donaciones.routes());

// Definimos una ruta base
router.get('/', async (ctx) => {
    ctx.body = 'API de Reboot!';
  });
  
module.exports = router;


// Esta estructura la sacamos de la T2 de Alberto Maturana
