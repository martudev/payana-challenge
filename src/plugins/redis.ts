import { environment, fastify } from '@src/config';
import redisPlugin from '@fastify/redis';

fastify.register(redisPlugin, {
	host: environment.REDIS_HOST,
	port: environment.REDIS_PORT,
	password: environment.REDIS_PASSWORD,
	family: 4,
});
