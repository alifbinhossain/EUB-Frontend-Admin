// index.tsx
import { EUB_LOGO } from '@/assets/images/base64';
import { RoomAllocation } from '@/pages/lib/room-allocation/entry-3/lib/types';
import { format } from 'date-fns';

import { getDateTime } from '@/utils';

import pdfMake from '..';
import { convertScheduleWithRowspan, generateAllSlots } from './converted-data';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface PDFCell {
	text: string;
	rowSpan?: number;
	style: string;
	margin?: [number, number, number, number];
}

export default function generateClassRoutinePDF(data: RoomAllocation[]) {
	const { semester, teacher, teacher_designation, teacher_phone, teacher_email, teacher_department, schedule } =
		convertScheduleWithRowspan(data);
	const slots = generateAllSlots();

	// Track which cells are spanned (will be empty placeholders)
	const spannedCells: Set<string> = new Set();

	// Build table body with proper rowSpan handling
	const body: (PDFCell | {})[][] = [];

	// Header row
	body.push([{ text: 'Time', style: 'headerCell' }, ...days.map((d) => ({ text: d, style: 'headerCell' }))]);

	// Data rows
	slots.forEach((slot, slotIndex) => {
		const row: (PDFCell | {})[] = [];

		// Time column
		row.push({ text: slot, style: 'dayCell' });

		// Day columns
		days.forEach((day) => {
			const cellKey = `${slotIndex}-${day}`;

			if (spannedCells.has(cellKey)) {
				// This cell is spanned by a previous cell - add empty placeholder
				row.push({});
				return;
			}

			const content = schedule[slot][day] || '';

			if (!content) {
				row.push({ text: '', style: 'scheduleCell' });
				return;
			}

			// Calculate rowSpan - count consecutive slots with same content
			let rowSpan = 1;
			for (let i = slotIndex + 1; i < slots.length; i++) {
				if (schedule[slots[i]][day] === content) {
					rowSpan++;
					// Mark this cell as spanned
					spannedCells.add(`${i}-${day}`);
				} else {
					break;
				}
			}

			// Add cell with rowSpan if needed
			const cell: PDFCell = {
				text: content,
				style: 'scheduleCell',
				margin: [2, 2, 2, 2],
			};

			if (rowSpan > 1) {
				cell.rowSpan = rowSpan;
			}

			row.push(cell);
		});

		body.push(row);
	});

	const pdfDoc = pdfMake.createPdf({
		pageSize: 'A4',
		pageOrientation: 'portrait',
		pageMargins: [10, 10, 10, 0],
		content: [
			{
				table: {
					widths: ['auto', '*', 'auto'],
					body: [
						[
							{ image: EUB_LOGO, width: 60, height: 60 },
							{
								text: [
									{ text: `${teacher}\n`, style: 'universityName' },
									{
										text: `${teacher_designation} , Department of ${teacher_department}\n`,
										style: 'addressName',
									},
									{ text: `Cell: ${teacher_phone}, E-mail: ${teacher_email}`, style: 'contactInfo' },
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
			{
				text: `Schedule (${semester})`,
				style: 'scheduleTitle',
			},
			{
				table: {
					widths: [50, ...days.map(() => '*')],
					body: body,
				},
				layout: {
					fillColor: (rowIndex: number) => {
						if (rowIndex === 0) return '#c9c5c5'; // Header
						return rowIndex % 2 === 0 ? '#F2F2F2' : null; // Alternating rows
					},
					hLineWidth: () => 1,
					vLineWidth: () => 1,
					hLineColor: () => '#000000',
					vLineColor: () => '#000000',
				},
			},
		],

		styles: {
			universityName: { fontSize: 20, bold: true },
			addressName: { fontSize: 12, bold: true, color: '#1f1f1f' },
			contactInfo: { fontSize: 10, color: '#666666' },
			scheduleTitle: { fontSize: 14, bold: true, alignment: 'center' },
			dayCell: { fontSize: 10, bold: true, alignment: 'center' },
			headerCell: { fontSize: 10, bold: true, alignment: 'center' },
			scheduleCell: { fontSize: 10, alignment: 'center' },
		},
	});

	return pdfDoc;
}
