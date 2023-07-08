import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import log from './logger';
import { Express, Request, Response } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
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

const swaggerSpec = swaggerJSDoc(options);
function swaggerDoc(app: Express, port: Number | String) {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDoc;
