interface FastifyMock {
	listen: jest.Mock;
	swagger: jest.Mock;
	log: { error: jest.Mock; info: jest.Mock; warn: jest.Mock };
	redis?: object;
}

export const fastifyMock: FastifyMock = {
	listen: jest.fn(),
	swagger: jest.fn(),
	log: {
		error: jest.fn(),
		info: jest.fn(),
		warn: jest.fn(),
	},
	redis: undefined,
};
export const mockEnv = {
	PORT: 9999,
	HOST: 'localhostMocked',
};
jest.mock('@src/config', () => ({
	fastify: fastifyMock,
	environment: mockEnv,
}));
