import { fastify } from '@src/config';

class DbClass {
	get() {
		return fastify.redis;
	}
}

export const DB = new DbClass();
