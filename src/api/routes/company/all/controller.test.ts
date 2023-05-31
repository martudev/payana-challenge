jest.mock('@routes/company/all/service', () => ({
	getCompanies: jest.fn().mockResolvedValue([{ id: '[id]', name: '[name]' }]),
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

		test('Should call service.getCompanies', () => {
			expect(result).toStrictEqual({
				companies: [{ id: '[id]', name: '[name]' }],
			});
		});
	});
});
