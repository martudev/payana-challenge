import { RouteShorthandOptions } from 'fastify';

export const schema: RouteShorthandOptions = {
	schema: {
		description: 'Create a company',
		tags: ['company'],
		body: {
			type: 'object',
			properties: {
				name: { type: 'string', transform: ['trim'] },
			},
			required: ['name'],
		},
		response: {
			200: {
				type: 'object',
				properties: {
					company: {
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
};
