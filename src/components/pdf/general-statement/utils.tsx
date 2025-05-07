import { EUB_LOGO } from '@/assets/images/base64';

import { DEFAULT_FONT_SIZE } from '../ui';
import { getEmptyColumn } from '../utils';

const PAGE_HEADER_EMPTY_ROW: string[] = ['', '', '', ''];

export const getPageHeader = () => {
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: [70, '*', 70, '*'],
		body: [
			[
				{
					image: EUB_LOGO,
					width: 70,
					height: 40,
					alignment: 'left',
				},
				{
					text: [`\n`, `\n`],
					alignment: 'left',
				},
				{
					colSpan: 2,
					text: [
						{
							text: 'Thread Order Sheet\n',
							fontSize: DEFAULT_FONT_SIZE + 4,
							bold: true,
						},
						`O/N:\n`,
						`Date:\n`,
						`PI Number:\n`,
					],
					alignment: 'right',
				},
				'',
			],
			PAGE_HEADER_EMPTY_ROW,

			// * Start of table
		],
	};
};

const EMPTY_COLUMN: string[] = getEmptyColumn(4);

export const getPageFooter = ({ currentPage, pageCount }: { currentPage: number; pageCount: number }) => {
	return {
		widths: ['*'], // Ensure widths match the number of columns
		body: [
			[
				{
					table: {
						headerRows: 1,
						widths: ['*'], // Match the single column in the body
						body: [
							[
								{
									text: 'Accounts Use Only\n\n\n\n\n\n\n\n',
									alignment: 'center',
									decoration: 'underline',
								},
							],
						],
						layout: 'noBorders', // Add layout to avoid border issues
						border: [false, false, false, false],
					},
				},
			],
			[
				{
					table: {
						headerRows: 1,
						widths: ['*', 10, '*', 10, '*'], // Ensure widths match the number of columns
						body: [
							[
								{ text: 'Requested By', alignment: 'center', border: [false, true, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: 'Dept. Head', alignment: 'center', border: [false, true, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: 'P&I CODE', alignment: 'center', border: [false, true, false, false] },
							],
							[
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
							],
						],
						layout: 'noBorders', // Add layout to avoid border issues
						border: [false, false, false, false],
					},
				},
			],
			[
				{
					colSpan: 1, // Ensure colSpan matches the number of columns
					text: `Page ${currentPage} of ${pageCount}`,
					alignment: 'center',
					border: [false, false, false, false],
				},
			],
		],
		layout: 'noBorders', // Add layout to avoid border issues
	};
};
