import { fastify, environment } from '@src/config';
import './plugins';
import './api';

export const start = async () => {
	try {
		await fastify.listen({
			port: environment.PORT,
			host: environment.HOST,
		});
		fastify.swagger();
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
