import React from 'react';
import { format } from 'date-fns';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IAdmissionTableData } from '../../_config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IAdmissionTableData }> = ({ data }) => {
	const renderHeaderITems = (): ITableListItems => {
		return [
			{
				label: 'Applicant ID',
				value: data.id,
			},
			{ label: 'Semester', value: data.semester },
			{
				label: 'Program',
				value: data.program_name,
			},
			{
				label: 'Image',
				value: data?.applicant_name,
			},
			{
				label: 'Created By',
				value: data.created_by_name,
			},
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
		];
	};

	const renderPersonalITems = (): ITableListItems => {
		return [
			{
				label: 'Father Name',
				value: data.father_name,
			},
			{ label: 'Mother Name', value: data.mother_name },
			{
				label: 'Local Guardian',
				value: data.local_guardian,
			},
			{
				label: 'Gender',
				value: data?.gender,
			},
			{
				label: 'Marital Status',
				value: data.marital_status,
			},
			{
				label: 'Date Of Birth',
				value: format(data.date_of_birth, 'dd/MM/yyyy'),
			},
			{
				label: 'Phone Number',
				value: data.phone_number,
			},
			{
				label: 'Email',
				value: data.email,
			},
			{
				label: 'Bkash',
				value: data.bkash,
			},
			{
				label: 'Blood Group',
				value: data.blood_group,
			},
			{
				label: 'Nationality',
				value: data.nationality,
			},
			{
				label: 'NID No',
				value: data.nid_number,
			},
			{
				label: 'Birth Certificate No',
				value: data.birth_certificate_number,
			},
		];
	};

	const renderAddressITems = (): ITableListItems => {
		return [
			{
				label: 'Address',
				value: data.present_address,
			},
			{ label: 'Village', value: data.village },
			{
				label: 'Post Office',
				value: data.post_office,
			},
			{
				label: 'Thana',
				value: data?.thana,
			},
			{
				label: 'District',
				value: data.district,
			},
		];
	};

	const renderElementsSchoolITems = (): ITableListItems => {
		return [
			{
				label: 'Group',
				value: data.ssc_group,
			},
			{
				label: 'Grade',
				value: data.ssc_grade,
			},
			{
				label: 'GPA',
				value: data?.ssc_gpa,
			},
			{
				label: 'Board',
				value: data.ssc_board,
			},
			{
				label: 'Passing Year',
				value: data.ssc_passing_year,
			},
			{
				label: 'Institute',
				value: data.ssc_institute,
			},
			{
				label: 'Registrar Number',
				value: data.ssc_registration_number,
			},
			{
				label: 'Roll Number',
				value: data.ssc_roll_number,
			},
		];
	};
	const renderHigherSchoolITems = (): ITableListItems => {
		return [
			{
				label: 'Group',
				value: data.hsc_group,
			},
			{ label: 'Grade', value: data.hsc_grade },
			{
				label: 'GPA',
				value: data?.hsc_gpa,
			},
			{
				label: 'Board',
				value: data.hsc_board,
			},
			{
				label: 'Passing Year',
				value: data.hsc_passing_year,
			},
			{
				label: 'Institute',
				value: data.hsc_institute,
			},
			{
				label: 'Registrar Number',
				value: data.hsc_registration_number,
			},
			{
				label: 'Roll Number',
				value: data.hsc_roll_number,
			},
		];
	};
	const renderBSCITems = (): ITableListItems => {
		return [
			{
				label: 'Name',
				value: data.bsc_name,
			},
			{ label: 'CGPA', value: data.bsc_cgpa },
			{
				label: 'Grade',
				value: data.ssc_grade,
			},
			{
				label: 'Passing Year',
				value: data?.bsc_passing_year,
			},
			{
				label: 'Institute',
				value: data.bsc_institute,
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-3 gap-4'>
					<TableList title='Basic Information' items={renderHeaderITems()} />
					<TableList title='Personal Information' items={renderPersonalITems()} />
					<TableList title='Address' items={renderAddressITems()} />
				</div>
			</SectionContainer>
			<SectionContainer title={'Education Information'}>
				<div className='grid grid-cols-3 gap-4'>
					<TableList title='Secondary Education Background' items={renderElementsSchoolITems()} />
					<TableList title='Higher Secondary Education Background' items={renderHigherSchoolITems()} />
					<TableList title='Bachelor Degree (Graduation)' items={renderBSCITems()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
