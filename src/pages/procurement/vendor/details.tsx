import { useEffect } from 'react';
import { TableProvider } from '@/context';

import { DetailsModal } from '@/components/core/modal';

import { itemColumns } from './config/columns';
import { IItemTableData } from './config/columns/columns.type';
import { useItems } from './config/query';

interface TrxProps {
	itemUuid: string;
	setItemUuid: (uuid: string | null) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const Trx: React.FC<TrxProps> = ({ itemUuid, setItemUuid, setOpen }) => {
	const { data: vendors, isLoading, refetch } = useItems<IItemTableData[]>(`vendor_uuid=${itemUuid}`);
	const onClose = () => {
		setItemUuid(null);
		setOpen(false);
	};
	const columns = itemColumns();
	return (
		<DetailsModal
			title='Item'
			isSmall={true}
			open={!!itemUuid}
			setOpen={onClose}
			content={
				<TableProvider
					title={'Item'}
					columns={columns}
					data={vendors ?? []}
					defaultVisibleColumns={{
						created_at: false,
						created_by_name: false,
						updated_at: false,
						actions: false,
					}}
					isLoading={isLoading}
					handleRefetch={refetch}
				></TableProvider>
			}
		/>
	);
};

export default Trx;
