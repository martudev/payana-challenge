const getCompaniesMock = jest
	.fn()
	.mockResolvedValue([{ id: '[id]', name: '[name]' }]);
jest.mock('@routes/company/service', () => ({
	getCompanies: getCompaniesMock,
	setCompanies: jest.fn().mockResolvedValue(null),
}));

jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('[id]') }));

import { fastifyMock } from '@src/__mocks__/config';
import { create, Return } from './service';

describe('service', () => {
	describe('create', () => {
		describe('on success', () => {
			let result: Return;

			beforeEach(async () => {
				result = await create({ name: '[name_test]' });
			});

			test('Should return company and companies from service.getCompanies', () => {
				expect(result).toStrictEqual({
					company: { id: '[id]', name: '[name_test]' },
					companies: [
						{ id: '[id]', name: '[name]' },
						{ id: '[id]', name: '[name_test]' },
					],
				});
			});
		});

		describe('on failure', () => {
			let result: Return;

			beforeAll(() => {
				getCompaniesMock.mockRejectedValue(new Error('invalid'));
			});

			beforeEach(async () => {
				result = await create({ name: '[name_test]' });
			});

			test('Should return company and companies with the current created company', () => {
				expect(result).toStrictEqual({
					company: { id: '[id]', name: '[name_test]' },
					companies: [{ id: '[id]', name: '[name_test]' }],
				});
			});

			test('Should log the error', () => {
				expect(fastifyMock.log.error).toHaveBeenCalledTimes(1);
			});

			test('Should log a info for defaulting companies', () => {
				expect(fastifyMock.log.info).toHaveBeenCalledTimes(3);
			});
		});
	});
});
