import { ISemCrsThrEntry } from '../config/types';

export const FormInfo = ({ data }: { data: ISemCrsThrEntry }) => {
	const path = window.location.pathname;
	return (
		<div className='flex flex-col items-center gap-2'>
			<h1 className='text-center text-xl font-semibold sm:text-2xl'>European University of Bangladesh</h1>
			<span className='sm:text text-sm font-semibold'>Proposed Course Evaluation Survey (CES)</span>

			<div className='flex flex-col items-center'>
				<span className='sm:text text-sm font-semibold'>{data?.department_name}</span>
				<span className='font-semibold'>
					{data?.semester_name + ': '}
					{path.split('/')[3] === 'mid' ? 'Mid Evaluation' : 'Final Evaluation'}
				</span>
				<span className='sm:text space-x-2 text-xs italic'>{data?.department_name}</span>
				<div className='sm:text space-x-2 text-xs italic'>
					<span className='font-semibold'>{data?.course_code}:</span>
					<span>{data?.course_name + ' (' + data?.course_section_name + ')'}</span>
				</div>

				<span className='sm:text text-xs italic'>{data?.teacher_name}</span>
			</div>
		</div>
	);
};

export const TopMessage = () => {
	return (
		<div className=''>
			<h2 className='mb-3 font-semibold text-gray-800 sm:text-lg'>Dear Students,</h2>
			<p className='sm:text text-justify text-sm leading-relaxed text-gray-600'>
				At <span className='font-medium text-blue-600'>European University of Bangladesh</span>, your learning
				experience is our top priority. To continuously improve our teaching quality, we request you to fill out
				the <span className='font-medium'>Course Evaluation Survey (CES)</span> with your honest and impartial
				feedback.
			</p>

			<p className='sm:text mt-3 text-justify text-sm leading-relaxed text-gray-600'>
				The purpose of this survey is to understand your learning experience in this course so that we can
				enhance our teaching methods, learning materials, and overall effectiveness. Your responses will remain{' '}
				<span className='italic text-gray-800'>anonymous</span> and will be used only for academic quality
				improvement.
			</p>
		</div>
	);
};

export const BottomMessage = () => {
	return (
		<div className=''>
			<h2 className='text-center text-xl font-semibold text-blue-700'>Thank You!</h2>

			<p className='sm:text mt-4 text-center text-sm leading-relaxed text-gray-700'>
				Thank you for completing this survey. Your feedback is highly valued and will help us improve the
				quality of teaching and learning at the
				<span className='font-medium text-blue-600'> European University of Bangladesh</span>.
			</p>

			<p className='sm:text mt-3 text-center text-sm leading-relaxed text-gray-700'>
				We sincerely appreciate your time and contribution.
			</p>

			<div className='sm:text mt-6 border-t border-gray-300 pt-4 text-center text-sm'>
				<p className='text-sm font-medium text-gray-600'>Compiled and maintained by</p>
				<p className='font-semibold text-gray-800'>Faculty Development and Evaluation</p>
				<p className='text-sm text-gray-600'>European University of Bangladesh</p>
			</div>
		</div>
	);
};
