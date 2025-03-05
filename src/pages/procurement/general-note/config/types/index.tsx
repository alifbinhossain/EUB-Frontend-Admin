import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IGeneralNoteTableData } from '../columns/columns.type';

//* Visitor
export interface IGeneralNoteAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IGeneralNoteTableData | null;
}
