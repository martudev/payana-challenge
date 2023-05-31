import { fastify } from '@src/config';
import healthCheckPlugin from 'fastify-healthcheck';

fastify.register(healthCheckPlugin, {
	healthcheckUrl: '/live',
	logLevel: 'warn',
});
