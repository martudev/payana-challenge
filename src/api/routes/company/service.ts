import { fastify } from '@src/config';
import { DB } from '@services/db';
import { KEY } from '@routes/company/constants';
import { CompanyDb } from '@routes/company/interfaces';

export const getCompanies = async (): Promise<CompanyDb[]> => {
	fastify.log.info('Getting companies...');
	const db = DB.get();
	const data = await db.get(KEY);

	if (!data) {
		throw new Error(`value not found with key '${KEY}'`);
	}

	return JSON.parse(data) as CompanyDb[];
};

export const setCompanies = async (value: CompanyDb[]): Promise<void> => {
	fastify.log.info('Setting value to companies...');
	const db = DB.get();
	const response = await db.set(KEY, JSON.stringify(value));

	if (response !== 'OK') {
		throw new Error(`value with key '${KEY}' not saved correctly`);
	}
};
