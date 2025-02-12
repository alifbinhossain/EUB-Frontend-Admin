import { SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';

import { CLIENT_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';

interface TableTitleProps {
	title: string;
	subtitle?: string;
	titleClassName?: string;
	subtitleClassName?: string;
	clientRedirectUrl?: string;
}

const TableTitle: React.FC<TableTitleProps> = ({
	title,
	subtitle,
	titleClassName,
	subtitleClassName,
	clientRedirectUrl,
}) => {
	return (
		<div className='flex items-start justify-between gap-2 md:justify-start'>
			<div className='flex flex-col'>
				<h1
					className={cn(
						'flex items-center gap-2 text-xl font-semibold capitalize leading-tight text-primary md:text-2xl',
						titleClassName
					)}
				>
					{title}

					{clientRedirectUrl && (
						<Link
							target='_blank'
							className={buttonVariants({ variant: 'link', size: 'icon', className: 'text-accent' })}
							to={CLIENT_URL + clientRedirectUrl}
						>
							<SquareArrowOutUpRight className='size-5' />
						</Link>
					)}
				</h1>
				{subtitle && (
					<p className={cn('mt-0.5 text-sm capitalize text-secondary', subtitleClassName)}>{subtitle}</p>
				)}
			</div>
		</div>
	);
};

export default TableTitle;
