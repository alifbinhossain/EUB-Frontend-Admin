import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { officeEntryColumns } from '../../_config/columns';
import { IOfficeTableData } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IOfficeTableData }> = ({ data }) => {
	const columns = officeEntryColumns();

	return <DataTableEntry title='Purchase Entry' columns={columns} data={data?.office_entry || []} />;
};

export default EntryTable;
