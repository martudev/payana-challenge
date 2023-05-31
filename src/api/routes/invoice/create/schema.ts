import { RouteShorthandOptions } from 'fastify';

export const schema: RouteShorthandOptions = {
	schema: {
		description: 'Create an invoice',
		tags: ['invoice'],
		body: {
			type: 'object',
			properties: {
				amount: { type: 'number' },
				company_id: { type: 'string', transform: ['trim'] },
				description: { type: 'string', transform: ['trim'] },
			},
			required: ['amount', 'company_id', 'description'],
		},
		response: {
			200: {
				type: 'object',
				properties: {
					created: { type: 'boolean' },
					invoice: {
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
};
