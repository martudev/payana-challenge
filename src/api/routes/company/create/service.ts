import { fastify } from '@src/config';
import { CompanyDb, Company } from '@routes/company/interfaces';
import { v4 as uuid } from 'uuid';
import * as service from '@routes/company/service';

export interface Return {
	companies: CompanyDb[];
	company: CompanyDb;
}

export const create = async (body: Company): Promise<Return> => {
	fastify.log.info('Getting companies...');
	let companies: CompanyDb[] = [];
	try {
		companies = await service.getCompanies();
	} catch (e) {
		fastify.log.error(e);
		fastify.log.info('Defaulting companies to empty array');
	}

	// TODO: Maybe we need to check if the company name is equal to other one...

	const company = {
		id: uuid(),
		name: body.name,
	};
	companies.push(company);

	fastify.log.info('Setting companies...');
	await service.setCompanies(companies);

	return { companies, company };
};
