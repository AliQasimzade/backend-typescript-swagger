import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { authSwagger } from './auth.swagger';
import { modulesSwagger } from './modules.swagger';
import { rightsSwagger } from './rights.swagger';
import { companyTypesSwagger } from './compnayTypes.swagger';
import { countrySwagger } from './country.swagger';

const swaggerDocumentAccount = {
    openapi: '3.0.0',
    info: {
        title: 'Account API',
        version: 'v1',
        description: 'Authentication and Module APIs',
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
    security: [{ bearerAuth: [] }],
    paths: {
        ...authSwagger,
        ...rightsSwagger
    },
};

const swaggerDocumentCatalog = {
    openapi: '3.0.0',
    info: {
        title: 'Catalog API',
        version: 'v1',
        description: 'Catalog endpoints',
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
    security: [{ bearerAuth: [] }],
    paths: {
        ...modulesSwagger,
        ...companyTypesSwagger,
        ...countrySwagger
    }

};

export function setupSwagger(app: Express) {
    app.use('/swagger/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
        explorer: true,
        swaggerOptions: {
            urls: [
                { url: '/swagger/json/account', name: 'Account API - v1' },
                { url: '/swagger/json/catalog', name: 'Catalog API - v1' },
            ],
            docExpansion: 'list',
            persistAuthorization: true,
        },
    }));

    app.get('/swagger/json/account', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocumentAccount);
    });

    app.get('/swagger/json/catalog', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocumentCatalog);
    });
}
