import { IDefaultAddOrUpdateProps } from '@/types';

import {
	IAuthoritiesTableData,
	IBotTableData,
	ICertificateCourseFeeTableData,
	IClubTableData,
	IDepartmentTableData,
	IFacultyTableData,
	IProgramTableData,
	ITuitionFeeTableData,
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
//* Programs
export interface IProgramsAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProgramTableData | null;
}

//* Authorities
export interface IAuthoritiesAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IAuthoritiesTableData | null;
}

//* Certificate Course Fee
export interface ICertificateCourseFeeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICertificateCourseFeeTableData | null;
}

//* Tuition Fee
export interface ITuitionFeeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ITuitionFeeTableData | null;
}

// * Club
export interface IClubAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IClubTableData | null;
}
