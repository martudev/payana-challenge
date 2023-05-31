import { fastify } from '@src/config';
import { routes } from '@routes/invoice/routes';

fastify.register(routes, { prefix: 'invoice' });
