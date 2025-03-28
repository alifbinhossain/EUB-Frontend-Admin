import { StringOrTemplateHeader } from '@tanstack/react-table';
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
};

type FieldJoinInputUnit = {
	type: 'join-input-unit';
	placeholder?: string;
	unit: (index: number) => string;
	inputType?: string;
};

export type FieldDef = {
	header: string;
	accessorKey: string;
	className?: string;
	isLoading?: boolean;
	hidden?: boolean;
} & (FieldText | FieldNumber | FieldSelect | FieldReadonly | FieldCustom | FieldJoinInputUnit | FieldTextArea);

export interface KanbanProps {
	title: string;
	form: UseFormReturn<any>;
	fieldName: string;
	fieldDefs: FieldDef[];
	extraHeader?: React.ReactNode;
	handleAdd?: () => void;
	fields: FieldArrayWithId<any>[];
}

export interface ICard {
	uuid?: string;
	department_uuid?: string;
	department_head: boolean;
	teacher_email: string;
	teacher_phone: string | null;
	teacher_designation: string;
	teacher_uuid: string;
	education: string;
	publication: string;
	journal: string;
	about: string;
	appointment_date: string;
	resign_date: string | null;
	teacher_initials?: string;
	remarks: string | null;
	handleDragStart?: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
}

export interface ColumnProps {
	title: string;
	headingColor: string;
	cards: { title: string; id: string; column: string }[];
	column: string;
	setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export interface IAddCard {
	setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}
export interface AddCardFormData {
	uuid?: string;
	section_uuid: string;
	remarks: string | null;
}
export interface WorkSectionData {
	info_id: string;
	order_id: string;
	diagnosis_id: string;
	office_entries: ICard[];
}
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
