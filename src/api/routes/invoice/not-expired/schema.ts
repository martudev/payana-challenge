import { RouteShorthandOptions } from 'fastify';

export const schema: RouteShorthandOptions = {
	schema: {
		description: 'Filter all invoices by not yet due',
		tags: ['invoice'],
		response: {
			200: {
				type: 'object',
				properties: {
					results: {
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
					totalAmount: { type: 'number' },
				},
			},
		},
	},
};
