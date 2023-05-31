import { CompanyDb } from '@routes/company/interfaces';
import { fastify } from '@src/config';
import * as service from '@routes/company/service';

export const getCompanies = async (): Promise<CompanyDb[]> => {
	fastify.log.info('Getting companies...');
	return service.getCompanies();
};
