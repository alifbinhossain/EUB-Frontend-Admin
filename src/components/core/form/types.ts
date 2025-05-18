import React from 'react';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { OTPInputProps } from 'input-otp';
import { DayPickerProps } from 'react-day-picker';
import { DropzoneOptions } from 'react-dropzone';
import { ControllerFieldState, ControllerRenderProps, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { CalendarProps } from '@/components/ui/calendar';
import { InputProps } from '@/components/ui/input';
import { TextareaProps } from '@/components/ui/textarea';

// * form-textarea
export interface FormTextareaProps extends TextareaProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	disableLabel?: boolean;
	disabled?: boolean;
}

// * form-select
export interface IFormSelectOption {
	label: string | number;
	value: string | number;
	unit?: string;
}

export interface FormSelectProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	options: IFormSelectOption[];
	isDisabled?: boolean;
	disableLabel?: boolean;
	valueType?: 'string' | 'number';
}

// * form-section
export interface IFormSectionProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
	extraHeader?: React.ReactNode;
}

// * form-react-select
export interface FormReactSelectProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	options: IFormSelectOption[];
	unique?: boolean;
	excludeOptions?: string[];
	isDisabled?: boolean;
	disableLabel?: boolean;
	isMulti?: boolean;
	menuPortalTarget?: any;
	valueType?: 'string' | 'number';
	onChange?: (option?: any, field?: any) => void;
}

// * form-multi-select
export interface FormMultiSelectProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	options: IFormSelectOption[];
	isDisabled?: boolean;
	disableLabel?: boolean;
}

// * form-join-input-unit
export interface FormJoinInputUnitProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	disabled?: boolean;
	icon?: React.ReactNode;
	unit: string;
	disableLabel?: boolean;
}

// * form-join-input-select
export interface FormJoinInputSelectProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	selectField: {
		name: string;
		options: IFormSelectOption[];
		isDisabled?: boolean;
	};
}

// * form-input
export interface FormInputProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	disableLabel?: boolean;
}
// * form-phone
export type FormOtpProps = Omit<OTPInputProps, 'children'> & {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	optional?: boolean;
	disableLabel?: boolean;
};

// * form-file-upload
export interface FormFileUploadProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	disableLabel?: boolean;
	options?: DropzoneOptions;
	isUpdate?: boolean;
	fileType?: 'image' | 'document' | 'all' | 'video' | 'audio';
	errorText?: string;
}

// * form-date-picker
export interface FormDatePickerProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	disableLabel?: boolean;
	className?: string;
	calendarProps?: DayPickerProps;
	disabled?: boolean;
}

// * form-checkbox
export interface FormCheckboxProps extends CheckboxProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	disableLabel?: boolean;
	labelClassName?: string;
	isBoxed?: boolean;
}

// * form-switch
export interface FormSwitchProps extends CheckboxProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	disableLabel?: boolean;
	labelClassName?: string;
	isBoxed?: boolean;
}

// * form-add-edit-wrapper
export interface IFormAddEditWrapperProps {
	children: React.ReactNode;
	form: UseFormReturn<any, any, undefined>;
	onSubmit(values: any): void;
	title?: string;
}

// * file upload
export interface FormFileUploadProps {
	field: ControllerRenderProps<any, any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	className?: string;
	disableLabel?: boolean;
	accept?: string;
	multiple?: boolean;
}
