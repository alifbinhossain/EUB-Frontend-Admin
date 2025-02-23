import { Link } from 'react-router-dom';

import { CLIENT_URL } from '@/lib/secret';

import { buttonVariants } from '../ui/button';

interface ILinkOnlyProps {
	uri: string;
	title: string;
}

export const LinkOnly = ({ uri, title }: ILinkOnlyProps) => {
	return (
		<Link to={uri} className='font-medium text-foreground underline hover:text-accent'>
			{title}
		</Link>
	);
};
export const LinkWithRedirect = ({ title, uri }: ILinkOnlyProps) => {
	return (
		<Link target='_blank' className='font-medium text-foreground underline hover:text-accent' to={CLIENT_URL + uri}>
			{title}
		</Link>
	);
};
