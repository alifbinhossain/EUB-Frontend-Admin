import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import AdmissionRoutes from './admission';
import HrRoutes from './hr';
import inquiryRoutes from './inquiry';
import PortfolioRoutes from './portfollo';

const privateRoutes: IRoute[] = [...HrRoutes, ...PortfolioRoutes, ...inquiryRoutes, ...AdmissionRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
