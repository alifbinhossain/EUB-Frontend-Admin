import React from 'react';
import { Row } from '@tanstack/react-table';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Clipboard, LinkIcon, Notebook } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ShowLocalToast } from '@/components/others/toast';
import { QRButton } from '@/components/ui/qr-code-button';
import { Switch } from '@/components/ui/switch';

import { CLIENT_URL } from '@/lib/secret';

import { IFDEListTableData } from '../columns/columns.type';

interface EvaluationCellProps {
	// Row data
	rowData: Row<IFDEListTableData>;

	// Evaluation specific props
	evaluationType: 'mid' | 'final';
	isComplete: boolean;
	responseCount: number;
	isDisabled?: boolean;

	// Event handlers
	onSwitchChange: (row: any) => void;
	onQRClick: (row: any, type: 'mid' | 'final') => void;

	// Optional customization
	showLink?: boolean;
	showQR?: boolean;
	baseUrl?: string;
}
const CopyClipboard: React.FC<{
	text: string;
}> = ({ text }) => {
	const [copiedText, copy] = useCopyToClipboard();

	const handleCopy = (text: string) => () => {
		copy(text);
		ShowLocalToast({
			toastType: 'create',
			message: `${text} copied`,
		});
	};

	return <Clipboard size={16} className='mt-1' onClick={handleCopy(text)} />;
};

export const EvaluationCell: React.FC<EvaluationCellProps> = ({
	rowData,
	evaluationType,
	isComplete,
	responseCount,
	isDisabled = false,
	onSwitchChange,
	onQRClick,
	showLink = true,
	showQR = true,
	baseUrl,
}) => {
	// Generate the evaluation link
	const generateLink = React.useCallback(() => {
		if (!baseUrl) {
			const fullURL = window.location.href;
			const slice = fullURL.split('f');
			return `${slice[0]}fde/${rowData.original.uuid}/${evaluationType}`;
		}
		return `${baseUrl}fde/${rowData.original.uuid}/${evaluationType}`;
	}, [baseUrl, rowData.original.uuid, evaluationType]);

	const link = generateLink();

	// Handle switch change
	const handleSwitchChange = React.useCallback(() => {
		onSwitchChange(rowData);
	}, [onSwitchChange, rowData]);

	// Handle QR click
	const handleQRClick = React.useCallback(() => {
		onQRClick(rowData, evaluationType);
	}, [onQRClick, rowData, evaluationType]);

	// Render completed state
	if (isComplete) {
		return (
			<div className='flex flex-col gap-2'>
				<div className='flex items-center gap-2'>
					<Switch checked={true} onCheckedChange={handleSwitchChange} disabled={isDisabled} />
					<span>
						{responseCount}/{rowData.original.class_size}
					</span>
				</div>
				<div className='flex gap-2'>
					{showLink && (
						<button
							type='button'
							className='flex items-center gap-1 rounded-md py-1 text-xs text-gray-500 transition-colors duration-200 hover:bg-gray-200'
							disabled
						>
							<Clipboard size={16} className='mb-1 ml-1 inline-block' />
							<LinkIcon size={16} className='mb-1 ml-1 inline-block' />
						</button>
					)}

					{showQR && (
						<div>
							<QRButton onClick={handleQRClick} variant='primary' size='md' disabled />
						</div>
					)}
				</div>
			</div>
		);
	}

	// Special case for final evaluation when mid is not complete
	if (evaluationType === 'final' && !rowData.original.is_mid_evaluation_complete) {
		return (
			<div className='flex gap-2 rounded-sm bg-red-100 p-1 text-xs text-red-500'>
				<Notebook size={16} className='mb-1' />
				<span className=''>Need to complete mid evaluation</span>
			</div>
		);
	}

	// Render active state
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2'>
				<Switch checked={false} onCheckedChange={handleSwitchChange} disabled={isDisabled} />
				<span>
					{responseCount}/{rowData.original.class_size}
				</span>
			</div>
			<div className='flex gap-2'>
				<CopyClipboard text={link} />
				{showLink && (
					<Link target='_blank' className='font-medium text-foreground underline hover:text-accent' to={link}>
						<LinkIcon className='mt-1' size='16' />
					</Link>
				)}

				{showQR && (
					<div>
						<QRButton onClick={handleQRClick} variant='primary' size='md' />
					</div>
				)}
			</div>
		</div>
	);
};
