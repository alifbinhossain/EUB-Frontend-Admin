import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IDefaultImageAddOrUpdateProps } from '@/types';

import {
	IAuthoritiesTableData,
	IBotTableData,
	IDepartmentTableData,
	IDepartmentTeachersTableData,
	IFacultyTableData,
	IInfoTableData,
	IOffersTableData,
	IRoutineTableData,
} from '../columns/columns.type';

//* bot
export interface IBotAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IBotTableData | null;
}
//* Departments
export interface IDepartmentAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDepartmentTableData | null;
}

// * Faculty
export interface IFacultyAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IFacultyTableData | null;
}

// * Info
export interface IInfoAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IInfoTableData | null;
}

// * Routine
export interface IRoutineAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IRoutineTableData | null;
}

//* Programs
export interface IProgramsAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IInfoTableData | null;
}

//* Authorities
export interface IAuthoritiesAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IAuthoritiesTableData | null;
}

// * Offers
export interface IOffersAddOrUpdateProps extends IDefaultImageAddOrUpdateProps {
	updatedData?: IOffersTableData | null;
}

// * Department-Teachers
export interface IDepartmentTeachersAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDepartmentTeachersTableData | null;
	isUpdate?: boolean;
	onSubmit: (data: any) => void;
}
