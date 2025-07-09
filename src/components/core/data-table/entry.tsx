import { TableProvider } from '@/context';

import { IDataTableEntryProps } from './types';

const DataTableEntry = <TData, TValue>({
	title,
	columns,
	data,
	toolbarOptions,
	defaultVisibleColumns,
	children,
}: IDataTableEntryProps<TData, TValue>) => {
	return (
		<TableProvider
			title={title}
			columns={columns}
			data={data}
			enableRowSelection={false}
			toolbarOptions={toolbarOptions}
			defaultVisibleColumns={defaultVisibleColumns}
			isEntry
		>
			{children}
		</TableProvider>
	);
};

export default DataTableEntry;
