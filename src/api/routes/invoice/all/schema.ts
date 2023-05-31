import { RouteShorthandOptions } from 'fastify';

export const schema: RouteShorthandOptions = {
	schema: {
		description: 'Get all invoices',
		tags: ['invoice'],
		response: {
			200: {
				type: 'object',
				properties: {
					invoices: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: { type: 'string' },
								amount: { type: 'number' },
								expiration_date: { type: 'string' },
								company_id: { type: 'string' },
								description: { type: 'string' },
							},
						},
					},
				},
			},
		},
	},
};
