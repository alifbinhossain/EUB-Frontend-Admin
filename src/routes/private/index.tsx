import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import PortfolioRoutes from './portfollo';

const privateRoutes: IRoute[] = [...HrRoutes, ...PortfolioRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
