import { fastifyMock } from '@src/__mocks__/config';
import { FastifyRedis } from '@fastify/redis';
import { DB } from './db';

describe('db', () => {
	describe('when fastify db is defined', () => {
		let instance: FastifyRedis;

		beforeAll(() => {
			fastifyMock.redis = {};
		});

		beforeEach(async () => {
			instance = DB.get();
		});

		test('Should get db instance and be defined', () => {
			expect(instance).toBeDefined();
		});
	});

	describe('when fastify db is not defined', () => {
		let instance: FastifyRedis;

		beforeAll(() => {
			fastifyMock.redis = undefined;
		});

		beforeEach(async () => {
			instance = DB.get();
		});

		test('Should get db instance and be undefined', () => {
			expect(instance).toBeUndefined();
		});
	});
});
