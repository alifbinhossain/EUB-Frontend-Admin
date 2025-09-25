import { EUB_LOGO } from '@/assets/images/base64';

import { DEFAULT_FONT_SIZE } from '../ui';

export const getPageHeader = () => {
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: ['*'],
		body: [
			[
				{
					table: {
						headerRows: 1,
						widths: [80, 10, '*'],
						body: [
							[
								{
									image: EUB_LOGO,
									width: 50,
									height: 40,
									alignment: 'right',
								},
								{},
								{
									text: ' European University of Bangladesh',
									fontSize: DEFAULT_FONT_SIZE + 14,
									bold: true,
									color: '#023020',
									style: 'header',
								},
							],
						],
					},
					layout: 'noBorders',
				},
			],

			// * Start of table
		],
	};
};
