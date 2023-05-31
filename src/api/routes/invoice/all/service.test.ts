jest.mock('@routes/invoice/service', () => ({
	getInvoices: jest.fn().mockResolvedValue([{ id: '[id]' }]),
}));

import '@src/__mocks__/config';
import { InvoiceDb } from '@routes/invoice/interfaces';
import { getInvoices } from './service';

describe('service', () => {
	describe('getInvoices', () => {
		let result: InvoiceDb[];

		beforeEach(async () => {
			result = await getInvoices();
		});

		test('Should call service.getInvoices', () => {
			expect(result).toStrictEqual([{ id: '[id]' }]);
		});
	});
});
