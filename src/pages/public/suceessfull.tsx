import React from 'react';
import { firstRoute } from '@/routes';
import { BadgeCheck, Smile } from 'lucide-react';

type TTemplate = {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
	children?: React.ReactNode;
};

const Template: React.FC<TTemplate> = ({ icon, title, subtitle, children }) => {
	return (
		<div className='mx-auto flex h-screen w-3/4 flex-col items-center justify-center gap-12 py-8 sm:w-1/2'>
			{icon}
			<div className='flex flex-col items-center gap-4'>
				<h1 className='text-center text-3xl font-medium capitalize'>{title}</h1>
				<p className='text-center text-sm sm:text-xl'>{subtitle}</p>
				{children}
			</div>
		</div>
	);
};

export default function Success() {
	return (
		<Template
			icon={<BadgeCheck className='size-24 text-green-500' />}
			title='Your Form Submitted Successfully'
			subtitle={`Thank you for completing this survey. Your feedback is highly valued and will help us improve the
					quality of teaching and learning at the European University of Bangladesh. We sincerely appreciate your time and contribution`}
		>
			<div className='sm:text mt-6 border-t border-gray-300 pt-4 text-center text-sm'>
				<p className='text-sm font-medium text-gray-600'>Compiled and maintained by</p>
				<p className='font-semibold text-gray-800'>Faculty Development and Evaluation</p>
				<p className='text-sm text-gray-600'>
					<a href='https://eub.edu.bd/' target='_blank' className='text-blue-600 hover:underline'>
						European University of Bangladesh
					</a>
				</p>
			</div>
		</Template>
	);
}
