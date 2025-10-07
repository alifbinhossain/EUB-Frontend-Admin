import { ShieldCheck } from 'lucide-react';

const AlertInfo = () => {
	return (
		<div className='flex items-center gap-4 rounded-2xl p-6'>
			<div>
				<h2 className='mb-2 flex items-center gap-2 text-xl font-semibold text-blue-700'>
					<ShieldCheck className='text-blue-600' /> Your Privacy Matters{' '}
				</h2>

				<div className='space-y-4'>
					{/* English version */}
					<p className='mb-4 leading-relaxed text-gray-700'>
						All responses in this course evaluation are completely anonymous. Your identity and personal
						information will <strong>never</strong> be shared with faculty or staff. Your feedback is
						valuable and helps us improve courses while protecting your privacy.
					</p>

					<hr className='border-gray-300' />

					{/* Bangla version */}
					<p className='font-[Noto_Serif_Bengali,_sans-serif] leading-relaxed text-gray-700'>
						এই কোর্স মূল্যায়নে আপনার সমস্ত উত্তর সম্পূর্ণ গোপন রাখা হবে। আপনার পরিচয় বা ব্যক্তিগত তথ্য
						কখনই শিক্ষক বা অন্য কারও সঙ্গে শেয়ার করা হবে না। আপনার সৎ মতামত আমাদের কোর্সের মান উন্নয়নে
						সহায়তা করবে, এবং আপনার গোপনীয়তা সর্বদা সুরক্ষিত থাকবে।
					</p>
				</div>
			</div>
		</div>
	);
};

export default AlertInfo;
