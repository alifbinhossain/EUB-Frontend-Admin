import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import inquiryRoutes from './inquiry';
import PortfolioRoutes from './portfollo';
import procurementRoutes from './procurement';

const privateRoutes: IRoute[] = [...HrRoutes, ...PortfolioRoutes, ...inquiryRoutes, ...procurementRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
