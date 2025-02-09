const fileFields: readonly string[] = ['image'];

const Formdata = <T extends Record<string, any>>(data: T) => {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		if (fileFields.includes(key)) {
			if (typeof value !== 'string') formData.append(key, value || '');
		} else {
			formData.append(key, value || '');
		}
	});

	return formData;
};

export default Formdata;
