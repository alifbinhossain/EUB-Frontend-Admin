import FormAddEditWrapper from './add-edit-wrapper';
import FormCheckbox from './checkbox';
import FormDatePicker from './date-picker';
import FormDynamicFields from './form-dynamic-fields';
import FormInput from './input';
import FormJoinInputSelect from './join-input-select';
import FormJoinInputUnit from './join-input-unit';
import FormMultiSelect from './multi-select';
import FormReactSelect from './react-select';
import FormSection from './section';
import FormSelect from './select';
import FormSubmit from './submit';
import FormTextarea from './textarea';

const Form = {
	Input: FormInput,
	Textarea: FormTextarea,
	DatePicker: FormDatePicker,
	Checkbox: FormCheckbox,
	Select: FormSelect,
	MultiSelect: FormMultiSelect,
	ReactSelect: FormReactSelect,
	Submit: FormSubmit,
	Section: FormSection,
	JoinInputUnit: FormJoinInputUnit,
	JoinInputSelect: FormJoinInputSelect,
	DynamicFields: FormDynamicFields,
	AddEditWrapper: FormAddEditWrapper,
};

export default Form;
