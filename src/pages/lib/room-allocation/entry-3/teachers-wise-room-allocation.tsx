import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import PdfV2 from '@/components/pdf/room-allocation-teacher-wise';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherTeachers } from '@/lib/common-queries/other';

import { useRoomAllocationData } from '../../config/query';
import { TEACHER_ROOM_ALLOCATION_PDF_NULL, TEACHER_ROOM_ALLOCATION_PDF_SCHEMA } from '../../config/schema';
import { RoomAllocation } from './lib/types';

const AddOrUpdate: React.FC<any> = ({ open, setOpen, semester_uuid, teachersList }) => {
	const form = useRHF(TEACHER_ROOM_ALLOCATION_PDF_SCHEMA, TEACHER_ROOM_ALLOCATION_PDF_NULL);

	const { data } = useRoomAllocationData<RoomAllocation[]>(
		`teachers_uuid=${form.watch('teachers_uuid')}&semester_uuid=${semester_uuid}`
	);

	const onClose = () => {
		form.reset(TEACHER_ROOM_ALLOCATION_PDF_NULL);
		setOpen((prev: boolean) => !prev);
	};

	// Submit handler
	async function onSubmit() {
		const printWindow = window.open('', '_blank');
		PdfV2(data as any)?.print({}, printWindow);
	}
	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={'Room Allocation of Teacher PDF'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='teachers_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Teacher'
						menuPortalTarget={document.body}
						options={teachersList!}
						placeholder='Select Teacher'
						{...props}
					/>
				)}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
