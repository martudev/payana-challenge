import { FastifyPluginCallback } from 'fastify';
import * as allRoute from '@routes/invoice/all';
import * as createRoute from '@routes/invoice/create';
import * as notExpiredRoute from '@routes/invoice/not-expired';

export const routes: FastifyPluginCallback = (instance, opts, next) => {
	instance.get('/all', allRoute.schema, allRoute.handler);

	instance.put('/create', createRoute.schema, createRoute.handler);

	instance.get(
		'/not-expired',
		notExpiredRoute.schema,
		notExpiredRoute.handler,
	);

	next();
};
