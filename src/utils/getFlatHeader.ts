const getFlatHeader = (value: any): any => {
	if (typeof value === 'object') {
		return value.props.children
			.map((child: any) => {
				if (typeof child === 'object') return child.props.children;
				return child;
			})
			.join('');
	}

	// here if the header is a string like 'Cost \nService'
	// then it will return 'Cost Service'
	// which will be used in the column header in excel
	return value.split('\n').join(' ');
};

export default getFlatHeader;
