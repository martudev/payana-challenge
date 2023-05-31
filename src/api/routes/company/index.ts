import { fastify } from '@src/config';
import { routes } from '@routes/company/routes';

fastify.register(routes, { prefix: 'company' });
