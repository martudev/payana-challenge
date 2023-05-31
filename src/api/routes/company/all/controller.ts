import { RouteHandlerMethod } from 'fastify';
import * as service from '@routes/company/all/service';

export const handler: RouteHandlerMethod = async (request, reply) => {
	const companies = await service.getCompanies();
	return { companies };
};
