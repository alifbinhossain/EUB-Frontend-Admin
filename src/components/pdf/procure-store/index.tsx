import { EUB_LOGO } from '@/assets/images/base64';
import { IProcureStoreTableData } from '@/pages/procurement/procure(store)/config/columns/columns.type';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { NumToWord } from '@/lib/NumToWords';
import { getDateTime } from '@/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: IProcureStoreTableData) {
	const headerHeight = 20;
	const footerHeight = 50;
	const node = [
		getTable('index', 'No', 'center'),
		getTable('item_name', 'Description'),
		getTable('purchase_cost_center_name', 'Product Type'),
		getTable('provided_quantity', 'Quantity', 'right'),
		getTable('unit_price', 'Unit Price', 'right'),
		getTable('total_price', 'Total', 'right'),
	];
	let grand_total = 0;
	data?.item_work_order_entry.map((item) => {
		if (item) {
			item.total_price = item.provided_quantity * item.unit_price;
			grand_total += item.total_price;
		}
	});

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Footer

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
				text: 'Work Order',
				bold: true,
				decoration: 'underline',
				fontSize: DEFAULT_FONT_SIZE + 4,
				alignment: 'center',
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: ['*', '*'],
					body: [
						[
							{
								text: `To,\n${data?.vendor_name}\n${data?.vendor_address ? data?.vendor_address + ',\n' : ''}${data?.vendor_phone}`,
								alignment: 'left',
							},
							{ text: `Date: ${format(data?.created_at, 'dd-MM-yyyy')}`, alignment: 'right' }, // { text: `Date: ${format(getDateTime(), 'dd-MM-yyyy')}`, alignment: 'right' },
						],
					],
				},
				layout: 'noBorders',
			},
			{ text: '\n' },

			{ text: '\n' },
			{ text: `Hello,` },
			{
				text: `With reference to your quotation, we are pleased to issue this Work Order in your favor.`,
				alignment: 'justify',
			},
			{ text: `Subject: ${data?.subject}`, bold: true },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, '*', '*', '*', '*', '*'],
					body: [
						node.map((col) => ({
							text: col.name,
							style: col.headerStyle,
							alignment: 'center',
							bold: true,
						})),
						...(data?.item_work_order_entry || []).map((item, index) =>
							node.map((nodeItem) => ({
								text: nodeItem.field === 'index' ? index + 1 : (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
						[
							{ text: `Total:`, colSpan: 4, alignment: 'right' },
							{},
							{},
							{},
							{},
							{ text: grand_total || 0, alignment: 'right' },
						],
					],
				},
			},
			{ text: '\n' },
			{ text: `In Words: ${NumToWord(grand_total || 0)} Taka Only`, bold: true },
			{ text: '\n' },

			{
				ul: [
					'Payment will be given 15 days after delivery of the products',
					`Price Mentioned in BDT including 5% TAX and Excluding VAT`,
				],
			},
			{ text: '\n' },
			{
				text: `Please delivery those products within ${format(data?.estimated_date, 'dd-MM-yyyy')} with your own vehicle cost at your own responsibility. If the product is not acceptable then you have to return it at your own cost and responsibility. Therefore, you are requested to supply us the above items as per mentioned.`,
				alignment: 'justify',
			},
			{ text: '\n' },
			{ text: 'Thanking You,' },
		],
	});

	return pdfDocGenerator;
}
