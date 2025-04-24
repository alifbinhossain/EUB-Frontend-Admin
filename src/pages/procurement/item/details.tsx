import { useEffect } from 'react';
import { TableProvider } from '@/context';

import { DetailsModal } from '@/components/core/modal';

import { vendorColumns } from './config/columns';
import { IItemVendorTableData } from './config/columns/columns.type';
import { useVendors } from './config/query';

interface TrxProps {
	itemUuid: string;
	setItemUuid: (uuid: string | null) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const Trx: React.FC<TrxProps> = ({ itemUuid, setItemUuid, setOpen }) => {
	const { data: vendors, isLoading, refetch } = useVendors<IItemVendorTableData[]>(itemUuid);
	const onClose = () => {
		setItemUuid(null);
		setOpen(false);
	};
	const columns = vendorColumns();
	return (
		<DetailsModal
			title='Vendors'
			isSmall={true}
			open={!!itemUuid}
			setOpen={onClose}
			content={
				<TableProvider
					title={'Item Vendors'}
					columns={columns}
					data={vendors ?? []}
					defaultVisibleColumns={{
						created_at: false,
						created_by_name: false,
						updated_at: false,
						actions: false,
					}}
					isEntry={false}
					isLoading={isLoading}
					handleRefetch={refetch}
				></TableProvider>
			}
		/>
	);
};

export default Trx;
