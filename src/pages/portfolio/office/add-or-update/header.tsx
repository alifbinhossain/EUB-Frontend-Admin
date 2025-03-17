interface IProps {
	fliedDefs: any;
	title?: string;
	handleAdd?: () => void;
	className?: string;
	children?: React.ReactNode;
}
export const Header: React.FC<IProps> = ({ fliedDefs }) => {
	return (
		<div className='flex items-center bg-primary/5 p-2'>
			<span className='text-sm font-semibold'>ID&emsp;</span>
			{fliedDefs.map((field: any) => (
				<span key={field.accessorKey} className='flex-1 text-sm font-semibold'>
					{field.header}
				</span>
			))}
		</div>
	);
};
