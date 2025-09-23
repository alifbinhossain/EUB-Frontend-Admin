'use client';

import { useState } from 'react';
import { Book, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PDFSelectorProps {
	data: any[];
	onPdf: (data: any[]) => void;
	onPdfV2: (data: any[]) => void;
	onTeacherWisePdf: () => void;
	loading?: boolean;
}

export function PDFSelector({ data, onPdf, onPdfV2, loading = false }: PDFSelectorProps) {
	const [selectedOption, setSelectedOption] = useState<string>('PDF');

	const handleOptionSelect = (option: string, action: () => void) => {
		setSelectedOption(option);
		action();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' className='h-9 w-fit px-6' disabled={loading}>
					<Book className='mr-2 h-4 w-4' />
					{selectedOption}
					<ChevronDown className='ml-1 h-3 w-3' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='dropdown-content-width-same-as-trigger'>
				<DropdownMenuItem
					onClick={() => handleOptionSelect('PDF', () => onPdf(data))}
					className='cursor-pointer'
				>
					<Book className='mr-2 h-4 w-4' />
					PDF
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleOptionSelect('PDF V2', () => onPdfV2(data))}
					className='cursor-pointer'
				>
					<Book className='mr-2 h-4 w-4' />
					PDF V2
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
