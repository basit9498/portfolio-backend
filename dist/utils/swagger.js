"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = __importDefault(require("./logger"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API',
            version: '1.0.0',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'jwt',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/**/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDoc(app, port) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    logger_1.default.info(`Docs available at http://localhost:${port}/docs`);
}
exports.default = swaggerDoc;
//# sourceMappingURL=swagger.js.map