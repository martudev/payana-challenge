import { RouteShorthandOptions } from 'fastify';

export const schema: RouteShorthandOptions = {
	schema: {
		description: 'Get all companies',
		tags: ['company'],
		response: {
			200: {
				type: 'object',
				properties: {
					companies: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: { type: 'string' },
								name: { type: 'string' },
							},
						},
					},
				},
			},
		},
	},
};
