import QRCode from 'qrcode';

import { xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageHeader } from './utils';

export default async function Index(url: string) {
	const headerHeight = 150;
	const GenerateQRCode = await QRCode.toString(`${url}`);

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

		// * Main Table
		content: [
			{
				svg: GenerateQRCode,
				alignment: 'center',
				width: 200,
				height: 180,
			},
			{
				text: url,
				alignment: 'center',
				bold: true,
			},
		],
	});

	return pdfDocGenerator;
}
