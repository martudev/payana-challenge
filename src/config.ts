import Fastify from 'fastify';
import dotenv from 'dotenv';
import { parseEnv, z } from 'znv';
import ajvKeywords from 'ajv-keywords';

dotenv.config();

export const environment = parseEnv(process.env, {
	LOGS: z.boolean().optional().default(true),
	HOST: z.string().optional().default('localhost'),
	PORT: z.number().optional().default(3000),
	SWAGGER_HOST: z.string().optional().default('localhost'),
	SWAGGER_PORT: z.number().optional().default(3000),
	REDIS_HOST: z.string().optional().default('localhost'),
	REDIS_PORT: z.number().optional().default(6379),
	REDIS_PASSWORD: z.string().optional().default('redis_password'),
});

export type Environment = typeof environment;

export const fastify = Fastify({
	logger: environment.LOGS,
	ajv: {
		customOptions: {
			removeAdditional: true,
			coerceTypes: false,
		},
		plugins: [[ajvKeywords, ['transform']]],
	},
});
