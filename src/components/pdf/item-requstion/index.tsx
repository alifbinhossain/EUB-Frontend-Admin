import { EUB_LOGO } from '@/assets/images/base64';
import { IRequisitionTableData } from '@/pages/procurement/requisition/config/columns/columns.type';
import { departments } from '@/pages/procurement/requisition/utils';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { formatDateTable } from '@/utils/formatDate';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: IRequisitionTableData) {
	const headerHeight = 20;
	const footerHeight = 0;

	const node = [
		getTable('index', 'Sl\n No', 'center'),
		getTable('item_name', 'Item'),
		getTable('req_quantity', 'Qty', 'right'),
		getTable('prev_provided_date', 'Date'),
		getTable('prev_provided_quantity', 'Qty', 'right'),
		getTable('sign', 'Sign'),
	];
	const departement_options = departments;
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
				text: 'Articles Requisition Form',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE + 4,
				alignment: 'center',
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, '*', '*', '*', '*', '*'],
					body: [
						[
							{ text: `UID: ${data?.requisition_id}`, colSpan: 3 },
							'',
							'',
							{ text: `Date: ${formatDateTable(data?.created_at)}`, colSpan: 3 },
							'',
							'',
						],
						[
							{ text: `Name: ${data?.created_by_name}`, colSpan: 4 },
							'',
							'',
							'',
							{
								text: `Designation: ${data?.designation ? data?.designation : ''}`,
								colSpan: 2,
							},
							'',
						],
						[
							{
								text: `Department: ${data?.department ? departement_options.find((item) => item.value === data?.department)?.label : ''}`,
								colSpan: 6,
							},
							'',
							'',
							'',
							'',
							'',
						],
						node.map((col) => ({ text: col.name, style: col.headerStyle, alignment: col.alignment })),
						...(data?.item_requisition || []).map((item, index) =>
							node.map((nodeItem) => ({
								text:
									nodeItem.field === 'index'
										? index + 1
										: nodeItem.field === 'prev_provided_date'
											? formatDateTable(item?.prev_provided_date)
											: (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
					],
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
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `${data?.pi_generated_number}`,
								alignment: 'center',
								border: [false, false, false, false],
							},
						],
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
					widths: ['*', '*'],
					body: [
						[{ text: 'Remarks', colSpan: 2 }, ''],
						[
							{ text: 'Requisitioner:\n\n\n\n\n', rowSpan: 5 },
							{ text: 'P&I:\n\n\n\n\n', rowSpan: 5 },
						],
						[{ text: '' }, { text: '' }],
						[{ text: '' }, { text: '' }],
						[{ text: '' }, { text: '' }],
						[{ text: '' }, { text: '' }],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
