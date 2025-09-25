import { IFDEListTableData } from '@/pages/fde/config/columns/columns.type';
import { format } from 'date-fns';
import QRCode from 'qrcode';

import { DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageHeader } from './utils';

export default async function Index(BaseUrl: string, data: IFDEListTableData[], type: any) {
	const headerHeight = 80;

	const contents = await Promise.all(
		data.map(async (item, idx) => {
			const url = `${BaseUrl}/${item.uuid}/${type}`;
			const qrCode = await QRCode.toString(url, { type: 'svg' }); // ensure svg output
			return {
				table: {
					widths: ['*'],
					body: [
						[
							{
								text: 'Proposed Course Evaluation Survey (CES)',
								bold: true,
								alignment: 'center',
								fontSize: DEFAULT_FONT_SIZE + 5,
							},
						],
						[
							{
								text: `${item?.semester_name}: ${type.toUpperCase()} Evaluation`,
								bold: true,
								alignment: 'center',
								fontSize: DEFAULT_FONT_SIZE + 5,
							},
						],
						[
							{
								text: `${item?.department_name}`,
								bold: true,
								alignment: 'center',
								fontSize: DEFAULT_FONT_SIZE + 5,
							},
						],
						[
							{
								text: `${item?.course_code}: ${item?.course_name} (${item?.course_section_name})`,
								bold: true,
								alignment: 'center',
								fontSize: DEFAULT_FONT_SIZE + 5,
							},
						],
						[
							{
								text: item?.teacher_name,
								bold: true,
								alignment: 'center',
								fontSize: DEFAULT_FONT_SIZE + 5,
							},
						],
						[
							{
								svg: qrCode,
								alignment: 'center',
								width: 500,
								height: 480,
							},
						],
						[
							{
								text: url,
								alignment: 'center',
								bold: true,
								fontSize: DEFAULT_FONT_SIZE + 5,
							},
						],
					],
				},
				layout: 'noBorders',
				pageBreak: idx < data.length - 1 ? ('after' as const) : undefined,
			};
		})
	);

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
		}),

		// * Page Header
		header: {
			table: getPageHeader() as any,
			layout: 'noBorders',
			margin: [xMargin, 30, xMargin, 0],
		},

		// * Page Footer with Page Numbers
		footer: (currentPage: number, pageCount: number) => {
			return {
				columns: [
					{
						text: `Printed on: ${format(new Date(), 'dd MMM, yyyy, hh:mm a')}`,
						alignment: 'left',
						fontSize: DEFAULT_FONT_SIZE,
					},
					{
						text: `Page ${currentPage} of ${pageCount}`,
						alignment: 'right',
						fontSize: DEFAULT_FONT_SIZE,
					},
				],
				margin: [xMargin, 0, xMargin, 20], // give bottom space
			};
		},

		pageMargins: [xMargin, headerHeight, xMargin, 60], // <-- reserve bottom margin for footer

		// * Main Table
		content: contents,
	});

	return pdfDocGenerator;
}
