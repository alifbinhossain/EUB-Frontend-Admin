interface IProps {
	fliedDefs: any;
	title?: string;
	handleAdd?: () => void;
	className?: string;
	children?: React.ReactNode;
}
export const Header: React.FC<IProps> = ({ fliedDefs }) => {
	return (
		<div className='flex bg-primary/5'>
			<span className='p-2 text-sm font-semibold'>ID&emsp;</span>
			<div className='grid flex-1 grid-cols-5 gap-2 p-2'>
				{fliedDefs.map((field: any) => (
					<span key={field.accessorKey} className='flex-1 text-sm font-semibold'>
						{field.header}
					</span>
				))}
			</div>
			<span className='p-2 text-sm font-semibold'>Action&emsp;</span>
		</div>
	);
};
