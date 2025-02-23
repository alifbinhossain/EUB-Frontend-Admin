import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import inquiryRoutes from './inquiry';
import PortfolioRoutes from './portfollo';

const privateRoutes: IRoute[] = [...HrRoutes, ...PortfolioRoutes, ...inquiryRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
