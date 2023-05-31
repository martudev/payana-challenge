import dayjs from 'dayjs';

const expiredInvoice = {
	id: '[id]',
	amount: 50,
	expiration_date: dayjs().subtract(1, 'day').toISOString(),
	company_id: '[company_id]',
	description: '[description]',
};

const notExpiredInvoice1 = {
	id: '[id]',
	amount: 100,
	expiration_date: dayjs().add(1, 'day').toISOString(),
	company_id: '[company_id]',
	description: '[description]',
};

const notExpiredInvoice2 = {
	id: '[id]',
	amount: 200,
	expiration_date: dayjs().add(2, 'day').toISOString(),
	company_id: '[company_id]',
	description: '[description]',
};

const getInvoicesMock = jest
	.fn()
	.mockResolvedValue([
		expiredInvoice,
		notExpiredInvoice1,
		notExpiredInvoice2,
	]);
jest.mock('@routes/invoice/service', () => ({
	getInvoices: getInvoicesMock,
}));

jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('[id]') }));

import '@src/__mocks__/config';
import { getInvoices, Return } from './service';

describe('service', () => {
	describe('getInvoices', () => {
		describe('on success', () => {
			describe('when service.getInvoices returns 2 not expired 1 expired invoices', () => {
				let result: Return;

				beforeEach(async () => {
					result = await getInvoices();
				});

				test('Should return notExpiredInvoices and totalAmount', () => {
					expect(result).toEqual({
						notExpiredInvoices: [
							notExpiredInvoice1,
							notExpiredInvoice2,
						],
						totalAmount: 300,
					});
				});
			});

			describe('when service.getInvoices returns 0 not expired 1 expired invoices', () => {
				let result: Return;

				beforeAll(() => {
					getInvoicesMock.mockResolvedValue([expiredInvoice]);
				});

				beforeEach(async () => {
					result = await getInvoices();
				});

				test('Should return notExpiredInvoices empty and totalAmount in 0', () => {
					expect(result).toEqual({
						notExpiredInvoices: [],
						totalAmount: 0,
					});
				});
			});

			describe('when service.getInvoices returns empty array', () => {
				let result: Return;

				beforeAll(() => {
					getInvoicesMock.mockResolvedValue([]);
				});

				beforeEach(async () => {
					result = await getInvoices();
				});

				test('Should return notExpiredInvoices empty and totalAmount in 0', () => {
					expect(result).toEqual({
						notExpiredInvoices: [],
						totalAmount: 0,
					});
				});
			});
		});
	});
});
