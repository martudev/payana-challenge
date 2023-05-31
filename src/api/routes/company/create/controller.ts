import { RouteHandlerMethod } from 'fastify';
import { Company } from '@src/api/routes/company/interfaces';
import * as service from '@routes/company/create/service';

export const handler: RouteHandlerMethod = async (request, reply) => {
	const { company } = await service.create(request.body as Company);
	return { created: true, company };
};
