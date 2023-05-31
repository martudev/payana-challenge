jest.mock('@routes/company/service', () => ({
	getCompanies: jest.fn().mockResolvedValue([{ id: '[id]', name: '[name]' }]),
}));

import '@src/__mocks__/config';
import { CompanyDb } from '@routes/company/interfaces';
import { getCompanies } from './service';

describe('service', () => {
	describe('getCompanies', () => {
		let result: CompanyDb[];

		beforeEach(async () => {
			result = await getCompanies();
		});

		test('Should call service.getCompanies', () => {
			expect(result).toStrictEqual([{ id: '[id]', name: '[name]' }]);
		});
	});
});
