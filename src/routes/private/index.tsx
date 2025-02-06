import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import WorkRoutes from './work';

const privateRoutes: IRoute[] = [...HrRoutes,  ...WorkRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
