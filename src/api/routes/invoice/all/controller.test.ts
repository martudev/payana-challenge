jest.mock('@routes/invoice/all/service', () => ({
	getInvoices: jest.fn().mockResolvedValue([{ id: '[id]' }]),
}));

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { handler } from './controller';

describe('controller', () => {
	describe('handler', () => {
		let result: unknown;

		beforeEach(async () => {
			result = await handler.call(
				undefined as unknown as FastifyInstance,
				undefined as unknown as FastifyRequest,
				undefined as unknown as FastifyReply,
			);
		});

		test('Should call service.getInvoices', () => {
			expect(result).toStrictEqual({
				invoices: [{ id: '[id]' }],
			});
		});
	});
});
