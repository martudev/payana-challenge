import { RouteHandlerMethod } from 'fastify';
import { Invoice } from '@routes/invoice/interfaces';
import * as service from '@routes/invoice/create/service';

export const handler: RouteHandlerMethod = async (request, reply) => {
	const { invoice } = await service.create(request.body as Invoice);
	return { created: true, invoice };
};
