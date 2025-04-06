import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import inquiryRoutes from './inquiry';
import PortfolioRoutes from './portfollo';
import procurementRoutes from './procurement';
import ProfileRoutes from './profile';

const privateRoutes: IRoute[] = [
	...HrRoutes,
	...PortfolioRoutes,
	...inquiryRoutes,
	...procurementRoutes,
	...ProfileRoutes,
];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
