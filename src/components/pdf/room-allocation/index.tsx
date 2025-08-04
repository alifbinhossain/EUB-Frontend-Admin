import { EUB_LOGO } from '@/assets/images/base64';
import { Room, RoomAllocation } from '@/pages/lib/room-allocation/entry-3/lib/types';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_Landscape_PAGE, DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { getDateTime } from '@/utils';

import pdfMake from '..';
import {
	convertScheduleWithFixedSlots12H,
	convertTableStructureToPdfMake,
	createTableWithColspan,
} from './converted-data';
import { getPageFooter } from './utils';

export default function generateClassRoutinePDF(data: RoomAllocation[]) {
	console.log(data);
	const headerHeight = 100;
	const footerHeight = 50;

	// Time slots and days
	const timeSlots = [
		'09:00 AM-10:20 AM',
		'10:30 AM-11:50 AM',
		'12:00 PM-1:20 PM',
		'1:30 PM-2:50 PM',
		'03:00 PM-04:20 PM',
		'04:30 PM-05:50 PM',
		'06:00 PM-07:20 PM',
		'07:30 PM-08:50 PM',
		'09:00 PM-10:20 PM',
	];

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const convertedData = convertScheduleWithFixedSlots12H(data, timeSlots, days);

	// Create enhanced table structure with colSpan
	const tableStructure = createTableWithColspan(convertedData.schedule, timeSlots, days);

	// Convert to PDFMake format
	const tableBody = convertTableStructureToPdfMake(tableStructure);

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_Landscape_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// Enhanced page header
		header: {
			margin: [xMargin, 20],
			table: {
				widths: ['auto', '*', 'auto'],
				body: [
					[
						{
							image: EUB_LOGO,
							width: 60,
							height: 60,
						},
						{
							text: [
								{ text: 'European University of Bangladesh\n', style: 'universityName' },
								{ text: 'Permanent Campus: 2/4 ,Gabtoli, Mirpur, Dhaka-1216\n', style: 'addressName' },
								{
									text: ' Cell: 01968-774927, E-mail: info@eub.edu.bd 30392',
									style: 'contactInfo',
								},
							],
							alignment: 'center',
						},
						{
							text: `Date: ${format(getDateTime(), 'dd/MM/yyyy')}`,
							style: 'contactInfo',
							alignment: 'right',
						},
					],
				],
			},
			layout: 'noBorders',
		},

		// Main content
		content: [
			{
				text: `${convertedData.room} Schedule (${convertedData.semester})`,
				style: 'scheduleTitle',
				margin: [0, 20, 0, 20],
			},
			{
				table: {
					headerRows: 1,
					widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
					body: tableBody,
				},
				layout: {
					fillColor: function (rowIndex: number, node: any, columnIndex: number) {
						// Header row
						if (rowIndex === 0) {
							return '#c9c5c5';
						}
						// // Day column
						// if (columnIndex === 0) {
						// 	return '#e8e8e8';
						// }
						// Alternate row colors for better readability
						return rowIndex % 2 === 0 ? '#F2F2F2' : null;
					},
					hLineWidth: function (i: number, node: any) {
						return 1;
					},
					vLineWidth: function (i: number, node: any) {
						return 1;
					},
					hLineColor: function (i: number, node: any) {
						return '#000000';
					},
					vLineColor: function (i: number, node: any) {
						return '#000000';
					},
				},
			},
		],

		// Enhanced styles
		styles: {
			universityName: {
				fontSize: 25,
				bold: true,
				color: '#023020',
			},
			departmentName: {
				fontSize: 12,
				color: '#666666',
			},
			addressName: {
				fontSize: 14,
				bold: true,
				color: '#1f1f1f',
			},
			contactInfo: {
				fontSize: 12,
				color: '#666666',
			},
			scheduleTitle: {
				fontSize: 16,
				bold: true,
				alignment: 'center',
				color: '#1f1f1f',
			},
			dayCell: {
				fontSize: 12,
				bold: true,
				alignment: 'center',
				color: '#1f1f1f',
			},
			headerCell: {
				fontSize: 10,
				bold: true,
				alignment: 'center',
			},
			scheduleCell: {
				fontSize: 10,
				alignment: 'center',
				color: '#1f1f1f',
				margin: [2, 2, 2, 2],
			},
		},
	});

	return pdfDocGenerator;
}
