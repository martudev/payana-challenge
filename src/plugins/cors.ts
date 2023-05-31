import { fastify } from '@src/config';
import cors from '@fastify/cors';

fastify.register(cors, {
	origin: '*',
});
