import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
	IAuthoritiesTableData,
	IBotTableData,
	ICertificateCourseFeeTableData,
	IClubTableData,
	IDepartmentTableData,
	IDepartmentTeachersTableData,
	IFacultyTableData,
	IFinancialInfoTableData,
	IInfoTableData,
	IJobCircularTableData,
	INewsTableData,
	IOffersTableData,
	IPolicyTableData,
	IRoutineTableData,
	ITenderTableData,
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

// * Info
export interface IInfoAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IInfoTableData | null;
}

// * Routine
export interface IRoutineAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IRoutineTableData | null;
}

// * Job Circular
export interface IJobCircularAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IJobCircularTableData | null;
}

//* Programs
export interface IProgramsAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IInfoTableData | null;
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

// * Offers
export interface IOffersAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IOffersTableData | null;
}

// * Department-Teachers
export interface IDepartmentTeachersAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDepartmentTeachersTableData | null;
}

// * News
export interface INewsAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: INewsTableData | null;
	imagePostData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	imageUpdateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}
//* Financial Information
export interface IFinancialInformationAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IFinancialInfoTableData | null;
}

export interface IPolicyAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IPolicyTableData | null;
}
export interface ITenderAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: ITenderTableData | null;
}
