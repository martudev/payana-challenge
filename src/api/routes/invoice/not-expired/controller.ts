import { RouteHandlerMethod } from 'fastify';
import * as service from '@routes/invoice/not-expired/service';

export const handler: RouteHandlerMethod = async (request, reply) => {
	const { notExpiredInvoices, totalAmount } = await service.getInvoices();
	return { results: notExpiredInvoices, totalAmount };
};
