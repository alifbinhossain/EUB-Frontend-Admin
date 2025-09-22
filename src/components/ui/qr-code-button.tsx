import { QrCode } from 'lucide-react';

interface QRButtonProps {
	onClick: () => void;
	disabled?: boolean;
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md';
}

export const QRButton: React.FC<QRButtonProps> = ({ onClick, disabled = false, variant = 'primary', size = 'sm' }) => {
	const baseClasses =
		'flex items-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';

	const variantClasses = {
		primary: 'text-blue-600 hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200 focus:ring-blue-500',
		secondary:
			'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus:ring-gray-500',
		ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:bg-gray-200 focus:ring-gray-500',
	};

	const sizeClasses = {
		sm: 'px-1 py-1 text-xs',
		md: 'px-1 py-1.5 text-sm',
	};

	const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

	return (
		<button
			type='button'
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
			onClick={onClick}
			disabled={disabled}
		>
			<QrCode size={size === 'sm' ? 14 : 16} />
			<span></span>
		</button>
	);
};
