import { EUB_LOGO } from '@/assets/images/base64';
import { IGeneralStatement } from '@/pages/procurement/general-statment/config/schema';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: IGeneralStatement) {
	const headerHeight = 20;
	const footerHeight = 0;

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header
		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount }),
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),

		// * Main Table
		content: [
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
						[
							{
								text: 'Gabtoli, Mirpur, Dhaka-1216',
								bold: true,
								colSpan: 3,
								alignment: 'center',
							},
						],
					],
				},
				layout: customTable,
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				text: 'General Note',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE + 4,
				alignment: 'center',
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: ['*'],
					body: [[{ text: `${data?.general_note}\n\n`, alignment: 'justify' }]],
				},
			},
			{ text: '\n' },
			{ text: '\n' },
			{ text: '\n' },
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: ['*', 10, '*', 10, '*'],
					body: [
						[
							{ text: 'Requested By', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Dept. Head', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'P&I CODE', alignment: 'center', border: [false, true, false, false] },
						],
					],
				},
			},
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: ['*'],
					body: [[{ text: 'Accounts Use Only\n\n\n\n\n', alignment: 'center' }]],
				},
			},
			{ text: '\n' },
			{ text: '\n' },
			{ text: '\n' },
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: ['*', 10, '*', 10, '*'],
					body: [
						[
							{ text: 'Requested By', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Dept. Head', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'P&I CODE', alignment: 'center', border: [false, true, false, false] },
						],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
