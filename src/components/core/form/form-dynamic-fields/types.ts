import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { IFormSelectOption } from '@core/form/types';

type FieldReadonly = {
	type: 'readOnly';
};
type FieldCustom = {
	type: 'custom';
	component: (index: number) => React.ReactNode;
};

type FieldText = {
	type: 'text';
	// inputType?: 'text' | 'number';
	placeholder?: string;
};
type FieldTextArea = {
	type: 'textarea';
	placeholder?: string;
};
type FieldNumber = {
	type: 'number';
	placeholder?: string;
};

type FieldSelect = {
	type: 'select';
	placeholder?: string;
	options: IFormSelectOption[];
	excludeOptions?: string[];
	unique?: boolean;
};

type FieldJoinInputUnit = {
	type: 'join-input-unit';
	placeholder?: string;
	unit: (index: number) => string;
	inputType?: string;
};

type FieldImage = {
	type: 'image';
	placeholder?: string;
	isUpdate?: boolean;
};

type FieldCheckbox = {
	type: 'checkbox';
	placeholder?: string;
	isUpdate?: boolean;
};

export type FieldDef = {
	header: string;
	accessorKey: string;
	className?: string;
	isLoading?: boolean;
	hidden?: boolean;
} & (
	| FieldText
	| FieldNumber
	| FieldSelect
	| FieldReadonly
	| FieldCustom
	| FieldJoinInputUnit
	| FieldTextArea
	| FieldImage
	| FieldCheckbox
);

export interface DynamicFieldsProps {
	title: string;
	form: UseFormReturn<any>;
	fieldName: string;
	fieldDefs: FieldDef[];
	extraHeader?: React.ReactNode;
	handleAdd?: () => void;
	fields: FieldArrayWithId<any>[];
	viewAs?: 'default' | 'spreadsheet';
}
