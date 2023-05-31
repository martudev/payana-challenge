const getInvoicesMock = jest.fn().mockResolvedValue([
	{
		id: '[id]',
		amount: 1,
		expiration_date: '[expiration_date]',
		company_id: '[company_id]',
		description: '[description]',
	},
]);
jest.mock('@routes/invoice/service', () => ({
	getInvoices: getInvoicesMock,
	setInvoices: jest.fn().mockResolvedValue(null),
}));

jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('[id]') }));

import { fastifyMock } from '@src/__mocks__/config';
import { create, Return } from './service';

describe('service', () => {
	describe('create', () => {
		describe('on success', () => {
			let result: Return;

			beforeEach(async () => {
				result = await create({
					amount: 10,
					company_id: '[company_id]',
					description: '[description]',
				});
			});

			test('Should return invoice and invoices from service.getInvoices', () => {
				expect(result).toEqual(
					expect.objectContaining({
						invoice: {
							id: '[id]',
							amount: 10,
							expiration_date: expect.any(String),
							company_id: '[company_id]',
							description: '[description]',
						},
						invoices: [
							{
								id: '[id]',
								amount: 1,
								expiration_date: '[expiration_date]',
								company_id: '[company_id]',
								description: '[description]',
							},
							{
								id: '[id]',
								amount: 10,
								expiration_date: expect.any(String),
								company_id: '[company_id]',
								description: '[description]',
							},
						],
					}),
				);
			});
		});

		describe('on failure', () => {
			let result: Return;

			beforeAll(() => {
				getInvoicesMock.mockRejectedValue(new Error('invalid'));
			});

			beforeEach(async () => {
				result = await create({
					amount: 10,
					company_id: '[company_id]',
					description: '[description]',
				});
			});

			test('Should return invoice and invoices with the current created company', () => {
				expect(result).toEqual(
					expect.objectContaining({
						invoice: {
							id: '[id]',
							amount: 10,
							expiration_date: expect.any(String),
							company_id: '[company_id]',
							description: '[description]',
						},
						invoices: [
							{
								id: '[id]',
								amount: 10,
								expiration_date: expect.any(String),
								company_id: '[company_id]',
								description: '[description]',
							},
						],
					}),
				);
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
