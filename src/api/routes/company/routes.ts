import { FastifyPluginCallback } from 'fastify';
import * as allRoute from '@routes/company/all';
import * as createRoute from '@routes/company/create';

export const routes: FastifyPluginCallback = (instance, opts, next) => {
	instance.get('/all', allRoute.schema, allRoute.handler);

	instance.put('/create', createRoute.schema, createRoute.handler);

	next();
};
