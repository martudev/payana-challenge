import { fastify } from '@src/config';
import helmet from '@fastify/helmet';

fastify.register(helmet, {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: [`'self'`],
			styleSrc: [`'self'`, `'unsafe-inline'`],
			imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
			scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
		},
	},
});
