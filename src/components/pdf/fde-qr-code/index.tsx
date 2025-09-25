import { IFDEListTableData } from '@/pages/fde/config/columns/columns.type';
import QRCode from 'qrcode';

import { DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageHeader } from './utils';

export default async function Index(url: string, data: IFDEListTableData, type: 'mid' | 'final') {
	const headerHeight = 180;
	const GenerateQRCode = await QRCode.toString(`${url}`);

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
		}),

		// * Page Header
		header: {
			table: getPageHeader(data, type) as any,
			layout: 'noBorders',
			margin: [xMargin, 30, xMargin, 0],
		},

		// * Main Table
		content: [
			{
				svg: GenerateQRCode,
				alignment: 'center',
				width: 500,
				height: 480,
			},
			{
				text: url,
				alignment: 'center',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE + 5,
			},
		],
	});

	return pdfDocGenerator;
}
