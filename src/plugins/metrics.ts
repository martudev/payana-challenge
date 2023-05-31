import { fastify } from '@src/config';
import metricsPlugin from 'fastify-metrics';

fastify.register(metricsPlugin, {
	endpoint: '/metrics',
	routeMetrics: {
		routeBlacklist: ['/live'],
		overrides: {
			histogram: {
				name: 'http_request_duration_ms',
				help: 'request duration in ms',
				labelNames: ['status_code', 'method', 'route'],
				buckets: [0.05, 0.1, 0.5, 1, 3, 5, 10],
			},
			summary: {
				name: 'http_request_summary_ms',
				help: 'request duration in ms summary',
				labelNames: ['status_code', 'method', 'route'],
				percentiles: [0.5, 0.9, 0.95, 0.99],
			},
		},
	},
});
