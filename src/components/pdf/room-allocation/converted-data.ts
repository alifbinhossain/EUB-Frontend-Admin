// converted-data.tsx
import { RoomAllocation } from '@/pages/lib/room-allocation/entry-3/lib/types';
import { addMinutes, format, getHours, getMinutes, isWithinInterval, parse, startOfDay } from 'date-fns';

interface ClassInfo {
	content: string;
	duration?: string;
	lines: string[];
}

interface TableCell {
	content: string;
	colspan: number;
	style: string;
}

interface TableRow {
	day: string;
	cells: TableCell[];
}

interface EnhancedTableStructure {
	header: string[];
	rows: TableRow[];
}

export interface ConvertedSchedule {
	semester: string;
	room: string;
	schedule: {
		[day: string]: {
			[timeSlot: string]: string;
		};
	};
}

// Fixed 12-hour slots
// const FIXED_SLOTS = [
//     '09:00 AM-10:20 AM',
//     '10:30 AM-11:50 AM',
//     '12:00 PM-1:20 PM',
//     '1:30 PM-2:50 PM',
//     '03:00 PM-04:20 PM',
//     '04:30 PM-05:50 PM',
//     '06:00 PM-07:20 PM',
//     '07:30 PM-08:50 PM',
//     '09:00 PM-10:20 PM',
// ];

// const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function convertScheduleWithFixedSlots12H(
	data: RoomAllocation[],
	FIXED_SLOTS: string[],
	DAYS: string[]
): ConvertedSchedule {
	if (!data || data.length === 0) {
		return {
			semester: 'Unknown Semester',
			room: 'Unknown Room',
			schedule: {},
		};
	}

	const semester = data[0].semester_name!;
	const room = data[0].room_name!;

	// Init empty schedule
	const schedule: ConvertedSchedule['schedule'] = {};
	for (const day of DAYS) {
		schedule[day] = {};
		for (const slot of FIXED_SLOTS) {
			schedule[day][slot] = '';
		}
	}

	// Helpers

	/** Parse "HH:mm" or "h:mm a" into a Date on today */
	function parseTime(timeStr: string, fmt: 'HH:mm' | 'h:mm a'): Date {
		return parse(timeStr, fmt, startOfDay(new Date()));
	}

	/** Convert 24h string to 12h formatted string */
	function to12h(time24: string): string {
		const d = parse(time24, 'HH:mm', startOfDay(new Date()));
		return format(d, 'h:mm a');
	}

	/** Convert 12h formatted string to "HH:mm" */
	function to24h(time12: string): string {
		const d = parse(time12, 'h:mm a', startOfDay(new Date()));
		return format(d, 'HH:mm');
	}

	/** Get all fixed slots overlapping a class interval */
	function getOverlappingSlots(from24: string, to24: string): string[] {
		const start = parseTime(from24, 'HH:mm');
		const end = parseTime(to24, 'HH:mm');
		return FIXED_SLOTS.filter((slot) => {
			const [s12, e12] = slot.split('-').map((s) => s.trim());
			const s = parseTime(to24h(s12), 'HH:mm');
			const e = parseTime(to24h(e12), 'HH:mm');
			return (
				isWithinInterval(start, { start: s, end: e }) ||
				isWithinInterval(end, { start: s, end: e }) ||
				(start <= s && end >= e)
			);
		});
	}

	// Map raw entries into slots
	for (const entry of data) {
		const dayKey = entry.day.slice(0, 3).replace(/^./, (c) => c.toUpperCase());
		const from = entry.from;
		const to = entry.to;
		const from12 = to12h(from);
		const to12 = to12h(to);
		const info = [entry.course_code, entry.course_section, `(${from12}-${to12})`].join('\n');

		const overlapping = getOverlappingSlots(from, to);
		for (const slot of overlapping) {
			if (schedule[dayKey][slot]) {
				schedule[dayKey][slot] += `\n---\n${info}`;
			} else {
				schedule[dayKey][slot] = info;
			}
		}
	}

	return { semester, room, schedule };
}

/** Extract content, duration, and lines from a cell text */
function extractClassInfo(content: string): ClassInfo | null {
	if (!content) return null;
	const lines = content.split('\n');
	const durationMatch = content.match(/\(([^)]+)\)/);
	const duration = durationMatch ? durationMatch[1] : undefined;
	const clean = content.replace(/\([^)]+\)/g, '').trim();
	return { content: clean, duration, lines };
}

/** Decide whether to show duration when merged */
function shouldShowDuration(slotRange: string, actualDuration?: string): boolean {
	if (!actualDuration) return false;
	const [sSlot, eSlot] = slotRange.split('-').map((t) => t.trim());
	const [sAct, eAct] = actualDuration.split('-').map((t) => t.trim());
	return !(to24(sSlot) === to24(sAct) && to24(eSlot) === to24(eAct));
}

/** Helper to convert any "h:mm a" or "HH:mm" to "HH:mm" */
function to24(str: string): string {
	const d = parse(str, /AM|PM/i.test(str) ? 'h:mm a' : 'HH:mm', startOfDay(new Date()));
	return format(d, 'HH:mm');
}

/** Build a table structure merging consecutive identical cells */
export function createTableWithColspan(
	scheduleData: { [day: string]: { [timeSlot: string]: string } },
	timeSlots: string[],
	days: string[]
): EnhancedTableStructure {
	const table: EnhancedTableStructure = { header: ['Day', ...timeSlots], rows: [] };

	for (const day of days) {
		const row: TableRow = { day, cells: [] };
		let i = 0;

		while (i < timeSlots.length) {
			const slot = timeSlots[i];
			const text = scheduleData[day]?.[slot] || '';
			let span = 1;

			// Count consecutive identical
			while (i + span < timeSlots.length && (scheduleData[day]?.[timeSlots[i + span]] || '') === text) {
				span++;
			}

			const info = extractClassInfo(text);
			let display = info ? info.content : '';
			if (info && span > 1) {
				const mergedRange = `${timeSlots[i].split('-')[0].trim()}-${timeSlots[i + span - 1]
					.split('-')[1]
					.trim()}`;
				if (shouldShowDuration(mergedRange, info.duration)) {
					display += `\n(${info.duration})`;
				}
			} else if (info && shouldShowDuration(slot, info.duration)) {
				display += `\n(${info.duration})`;
			}

			row.cells.push({ content: display, colspan: span, style: 'scheduleCell' });
			i += span;
		}

		table.rows.push(row);
	}

	return table;
}

/** Convert table structure into pdfMake body array */
export function convertTableStructureToPdfMake(table: EnhancedTableStructure): any[][] {
	const body: any[][] = [];
	body.push(table.header.map((h) => ({ text: h, style: h === 'Day' ? 'dayCell' : 'headerCell', bold: true })));

	for (const row of table.rows) {
		const pdfRow: any[] = [{ text: row.day, style: 'dayCell', bold: true }];
		for (const cell of row.cells) {
			const def: any = { text: cell.content, style: cell.style };
			if (cell.colspan > 1) def.colSpan = cell.colspan;
			pdfRow.push(def);
			for (let k = 1; k < cell.colspan; k++) pdfRow.push({});
		}
		body.push(pdfRow);
	}

	return body;
}
