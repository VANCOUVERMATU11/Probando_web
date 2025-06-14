const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const Router = require('koa-router');
const routes = require('./routes.js');
const orm = require('./models');

const swaggerUi = require('swagger-ui-koa');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 

const app = new Koa();
const router = new Router();

app.context.orm = orm;

//CORS bien configurado
app.use(cors({
  origin: '*', // o 'http://localhost:5173' si quieres restringir
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));


// Middlewares generales
app.use(KoaLogger());
app.use(koaBody());
app.use(cors());

// swagger middleware para servir archivos estáticos
app.use(swaggerUi.serve);

// Ruta para Swagger UI
router.get('/docs', swaggerUi.setup(swaggerDocument));

// ruta de bienvenida
router.get('/', (ctx) => {
  ctx.body = 'API de Reboot!';
});

// Usar el router de rutas propias
app.use(router.routes()).use(router.allowedMethods());
app.use(routes.routes()).use(routes.allowedMethods());

module.exports = app;

// Copiado de la T2 de Alberto Maturana + cambios para swagger
