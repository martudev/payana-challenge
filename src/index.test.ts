import { fastifyMock } from './__mocks__/config';
jest.mock('./plugins', () => jest.fn());
jest.mock('./api', () => jest.fn());

const processExitSpy = jest
	.spyOn(process, 'exit')
	.mockImplementation(() => ({} as unknown as never));

import { start } from './index';

describe('index', () => {
	describe('on success', () => {
		beforeEach(async () => {
			start();
		});

		test('Should call fastify.listen', () => {
			expect(fastifyMock.listen).toHaveBeenCalledWith({
				port: 9999,
				host: 'localhostMocked',
			});
		});
	});

	describe('on failure', () => {
		beforeAll(() => {
			fastifyMock.listen.mockRejectedValue(new Error('invalid'));
		});

		beforeEach(() => {
			start();
		});

		test('Should not call fastify.swagger', () => {
			expect(fastifyMock.swagger).toHaveBeenCalledTimes(0);
		});

		test('Should log the error', () => {
			expect(fastifyMock.log.error).toHaveBeenCalledWith(
				new Error('invalid'),
			);
		});

		test('Should call process.exit', () => {
			expect(processExitSpy).toHaveBeenCalledWith(1);
		});
	});
});
