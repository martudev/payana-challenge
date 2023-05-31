import { environment, fastify } from '@src/config';
import swaggerPlugin from '@fastify/swagger';
import swaggerUIPlugin from '@fastify/swagger-ui';

fastify.register(swaggerPlugin, {
	swagger: {
		info: {
			title: 'Payana swagger',
			description: 'Payana Backend Challenge swagger API',
			version: process.env.npm_package_version || 'not_defined',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		host: `${environment.SWAGGER_HOST}:${environment.SWAGGER_PORT}`,

		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
		tags: [
			{ name: 'company', description: 'Company related end-points' },
			{ name: 'invoice', description: 'Invoice related end-points' },
		],
		definitions: {
			User: {
				type: 'object',
				required: ['id', 'email'],
				properties: {
					id: { type: 'string', format: 'uuid' },
					firstName: { type: 'string' },
					lastName: { type: 'string' },
					email: { type: 'string', format: 'email' },
				},
			},
		},
	},
});

fastify.register(swaggerUIPlugin, {
	routePrefix: '/documentation',
	uiConfig: {
		docExpansion: 'full',
		deepLinking: false,
	},
	uiHooks: {
		onRequest: function (_request, _reply, next) {
			next();
		},
		preHandler: function (_request, _reply, next) {
			next();
		},
	},
	staticCSP: true,
	transformStaticCSP: (header) => header,
	transformSpecification: (swaggerObject) => {
		return swaggerObject;
	},
	transformSpecificationClone: true,
});
