import { IDefaultAddOrUpdateProps } from '@/types';

import { ICertificateCourseFeeTableData, IFinancialInfoTableData, ITuitionFeeTableData } from '../columns/columns.type';

//* Certificate Course Fee
export interface ICertificateCourseFeeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICertificateCourseFeeTableData | null;
}

//* Tuition Fee
export interface ITuitionFeeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ITuitionFeeTableData | null;
}

//* Financial Information
export interface IFinancialInformationAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IFinancialInfoTableData | null;
}
