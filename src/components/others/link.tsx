import { Link } from 'react-router-dom';

import { CLIENT_URL } from '@/lib/secret';

interface ILinkOnlyProps {
	uri: string;
	title: string;
	baseUrlNeeded?: boolean;
}

export const LinkOnly = ({ uri, title }: ILinkOnlyProps) => {
	return (
		<Link to={uri} className='font-medium text-foreground underline hover:text-accent'>
			{title}
		</Link>
	);
};
export const LinkWithRedirect = ({ title, uri, baseUrlNeeded = true }: ILinkOnlyProps) => {
	if (baseUrlNeeded) {
		return (
			<Link
				target='_blank'
				className='font-medium text-foreground underline hover:text-accent'
				to={CLIENT_URL + uri}
			>
				{title}
			</Link>
		);
	} else {
		return (
			<Link target='_blank' className='font-medium text-foreground underline hover:text-accent' to={uri}>
				{title}
			</Link>
		);
	}
};
