jest.mock('@routes/invoice/create/service', () => ({
	create: jest.fn().mockResolvedValue({ invoice: { id: '[id]' } }),
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

		test('Should call service.create', () => {
			expect(result).toStrictEqual({
				created: true,
				invoice: { id: '[id]' },
			});
		});
	});
});
