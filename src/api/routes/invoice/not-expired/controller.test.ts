jest.mock('@routes/invoice/not-expired/service', () => ({
	getInvoices: jest.fn().mockResolvedValue({
		notExpiredInvoices: [{ id: '[id]' }],
		totalAmount: 1,
	}),
}));

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { handler } from './controller';

describe('controller', () => {
	describe('handler', () => {
		let result: unknown;

		beforeEach(async () => {
			result = await handler.call(
				undefined as unknown as FastifyInstance,
				{ body: {} } as unknown as FastifyRequest,
				undefined as unknown as FastifyReply,
			);
		});

		test('Should call service.getInvoices', () => {
			expect(result).toStrictEqual({
				results: [{ id: '[id]' }],
				totalAmount: 1,
			});
		});
	});
});
