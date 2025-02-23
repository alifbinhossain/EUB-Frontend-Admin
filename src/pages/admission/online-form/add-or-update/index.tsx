import { useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePortfolioAdmission, usePortfolioAdmissionByUUID } from '../../_config/query';
import { IAdmissionForm, PORTFOLIO_ADMISSION_NULL, PORTFOLIO_ADMISSION_SCHEMA } from '../../_config/schema';
import Address from './address';
import BachelorDegree from './bachelor-degree';
import Header from './header';
import HigherEducationBackground from './higher-education-background';
import PersonalInformation from './personal-information';
import SecondaryEducationBackground from './secondary-education-background';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: admissionUrl, updateData, postData } = usePortfolioAdmission();

	const { data, invalidateQuery: invalidateTestDetails } = usePortfolioAdmissionByUUID(uuid as string);

	const form = useRHF(PORTFOLIO_ADMISSION_SCHEMA, PORTFOLIO_ADMISSION_NULL);

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IAdmissionForm) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const office_data = {
				...values,
				date_of_birth: format(new Date(values.date_of_birth), 'yyyy-MM-dd'),
				semester: values.spring === true ? 'spring' : values.summer === true ? 'summer' : 'fall',
				updated_at: getDateTime(),
			};
			const test_promise = await updateData.mutateAsync({
				url: `${admissionUrl}/${uuid}`,
				updatedData: office_data,
				isOnCloseNeeded: false,
			});

			try {
				await Promise.all([test_promise])
					.then(() => form.reset(PORTFOLIO_ADMISSION_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/admission/online-form/${uuid}/details`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const new_admission_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create Office description

		const office_data = {
			...values,
			uuid: new_admission_uuid,
			date_of_birth: format(new Date(values.date_of_birth), 'yyyy-MM-dd'),
			semester: values.spring === true ? 'spring' : values.summer === true ? 'summer' : 'fall',
			created_at,
			created_by,
		};
		// delete Office field from data to be sent

		// TODO: Update url and variable name ⬇️
		const office_promise = await postData.mutateAsync({
			url: admissionUrl,
			newData: office_data,
			isOnCloseNeeded: false,
		});

		try {
			await Promise.all([office_promise])
				.then(() => form.reset(PORTFOLIO_ADMISSION_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/portfolio/admission/${new_admission_uuid}/details`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Admission Entry' : ' Add Admission Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<PersonalInformation />
			<Address />
			<SecondaryEducationBackground />
			<HigherEducationBackground />
			<BachelorDegree />
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
