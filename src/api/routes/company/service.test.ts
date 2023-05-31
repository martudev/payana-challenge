const dbGetMock = jest
	.fn()
	.mockResolvedValue(JSON.stringify({ example: '[example]' }));
const dbSetMock = jest.fn().mockResolvedValue('OK');
const dbInstanceMock = {
	get: jest.fn().mockReturnValue({ get: dbGetMock, set: dbSetMock }),
};
jest.mock('@services/db', () => ({ DB: dbInstanceMock }));

import '@src/__mocks__/config';
import { CompanyDb } from '@routes/company/interfaces';
import { getCompanies, setCompanies } from './service';

describe('service', () => {
	describe('getCompanies', () => {
		describe('when value from key is defined', () => {
			let result: CompanyDb[];

			beforeEach(async () => {
				result = await getCompanies();
			});

			test('Should call getCompanies and retrieve an json', () => {
				expect(result).toStrictEqual({ example: '[example]' });
			});
		});

		describe('when value from key is undefined', () => {
			let message: string;

			beforeAll(() => {
				dbGetMock.mockResolvedValueOnce(undefined);
			});

			beforeEach(async () => {
				try {
					await getCompanies();
				} catch (e) {
					message = (<Error>e).message;
				}
			});

			test('Should call getCompanies and fails', () => {
				expect(message).toStrictEqual(
					`value not found with key 'companies'`,
				);
			});
		});
	});

	describe('setCompanies', () => {
		describe('when response is OK', () => {
			beforeEach(async () => {
				await setCompanies([{ id: '[id]', name: '[name]' }]);
			});

			test('Should call set()', () => {
				expect(dbSetMock).toHaveBeenCalledWith(
					'companies',
					JSON.stringify([{ id: '[id]', name: '[name]' }]),
				);
			});
		});

		describe('when response is not OK', () => {
			let message: string;
			beforeAll(() => {
				dbSetMock.mockResolvedValueOnce('not_ok');
			});

			beforeEach(async () => {
				try {
					await setCompanies([{ id: '[id]', name: '[name]' }]);
				} catch (e) {
					message = (<Error>e).message;
				}
			});

			test('Should call set()', () => {
				expect(message).toStrictEqual(
					`value with key 'companies' not saved correctly`,
				);
			});
		});
	});
});
