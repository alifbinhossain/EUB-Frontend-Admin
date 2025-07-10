import { RoomAllocation } from '@/pages/lib/room-allocation/entry-3/lib/types';

interface RawScheduleEntry {
	day: string;
	from: string;
	to: string;
	course_code: string;
	course_section: string;
	room_name: string;
	teacher_name: string;
	semester_name: string;
}

interface ConvertedSchedule {
	semester: string;
	room: string;
	schedule: {
		[day: string]: {
			[timeSlot: string]: string;
		};
	};
}

export function convertScheduleWithFixedSlots12H(data: RoomAllocation[]): ConvertedSchedule {
	if (!data || data.length === 0) {
		return {
			semester: 'Unknown Semester',
			schedule: {},
			room: 'Unknown Room',
		};
	}

	// Get semester name from first entry
	const semester = data[0].semester_name;
	const room = data[0].room_name;

	// Define fixed time slots in 12-hour format (chronologically sorted)
	const fixedSlots = [
		'09:00 AM-10:50 AM',
		'11:00 AM-12:50 PM',
		'01:00 PM-02:50 PM',
		'03:00 PM-04:50 PM',
		'05:00 PM-06:50 PM',
		'07:00 PM-08:50 PM',
		'09:00 PM-10:50 PM',
	];

	// Initialize schedule structure with fixed slots maintaining order
	const schedule: { [day: string]: { [timeSlot: string]: string } } = {};
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	days.forEach((day) => {
		schedule[day] = {};
		fixedSlots.forEach((slot) => {
			schedule[day][slot] = '';
		});
	});

	// Day mapping for consistency
	const dayMapping: { [key: string]: string } = {
		sun: 'Sun',
		mon: 'Mon',
		tue: 'Tue',
		wed: 'Wed',
		thu: 'Thu',
		fri: 'Fri',
		sat: 'Sat',
	};

	function convert24hTo12h(timeStr: string): string {
		const [hours, minutes] = timeStr.split(':').map(Number);

		if (hours === 0) {
			return `12:${minutes.toString().padStart(2, '0')} AM`;
		} else if (hours < 12) {
			return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
		} else if (hours === 12) {
			return `12:${minutes.toString().padStart(2, '0')} PM`;
		} else {
			return `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`;
		}
	}

	function convert12hTo24h(timeStr: string): string {
		const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
		if (!match) return timeStr;

		const [, hours, minutes, period] = match;
		let hour = parseInt(hours);

		if (period.toUpperCase() === 'AM' && hour === 12) {
			hour = 0;
		} else if (period.toUpperCase() === 'PM' && hour !== 12) {
			hour += 12;
		}

		return `${hour.toString().padStart(2, '0')}:${minutes}`;
	}

	function timeToMinutes(timeStr: string): number {
		const [hours, minutes] = timeStr.split(':').map(Number);
		return hours * 60 + minutes;
	}

	function getOverlappingSlots(startTime: string, endTime: string, slots: string[]): string[] {
		const overlapping: string[] = [];
		const startMinutes = timeToMinutes(startTime);
		const endMinutes = timeToMinutes(endTime);

		for (const slot of slots) {
			const [slotStart, slotEnd] = slot.split('-');
			// Convert 12h to 24h for calculation
			const slotStart24h = convert12hTo24h(slotStart.trim());
			const slotEnd24h = convert12hTo24h(slotEnd.trim());

			const slotStartMinutes = timeToMinutes(slotStart24h);
			const slotEndMinutes = timeToMinutes(slotEnd24h);

			// Check overlap: class overlaps if it starts before slot ends and ends after slot starts
			if (startMinutes < slotEndMinutes && endMinutes > slotStartMinutes) {
				overlapping.push(slot);
			}
		}

		return overlapping;
	}

	// Process each entry
	data.forEach((entry) => {
		const day = dayMapping[entry.day.toLowerCase()] || entry.day;
		const startTime = entry.from;
		const endTime = entry.to;

		// Create the schedule entry text with 12-hour format
		const startTime12h = convert24hTo12h(startTime);
		const endTime12h = convert24hTo12h(endTime);

		const courseInfo = `${entry.course_code}\n${entry.course_section}\n${entry.teacher_name}\n(${startTime12h}-${endTime12h})`;

		// Find overlapping slots
		const overlappingSlots = getOverlappingSlots(startTime, endTime, fixedSlots);

		// Add to all overlapping slots
		if (schedule[day]) {
			overlappingSlots.forEach((slot) => {
				if (schedule[day][slot]) {
					// Multiple classes in same slot - separate with divider
					schedule[day][slot] += `\n---\n${courseInfo}`;
				} else {
					schedule[day][slot] = courseInfo;
				}
			});
		}
	});

	return {
		semester,
		schedule,
		room,
	};
}
// Enhanced interfaces for colSpan functionality
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

function parseTime24h(timeStr: string): string {
	/**
	 * Parse time string to 24-hour format for comparison
	 */
	const cleanTime = timeStr.trim();

	// Handle 12-hour format
	const twelveHourMatch = cleanTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
	if (twelveHourMatch) {
		const [, hours, minutes, period] = twelveHourMatch;
		let hour = parseInt(hours);
		const min = parseInt(minutes);

		if (period.toUpperCase() === 'AM' && hour === 12) {
			hour = 0;
		} else if (period.toUpperCase() === 'PM' && hour !== 12) {
			hour += 12;
		}

		return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
	}

	// Handle 24-hour format
	const twentyFourHourMatch = cleanTime.match(/(\d{1,2}):(\d{2})/);
	if (twentyFourHourMatch) {
		const [, hours, minutes] = twentyFourHourMatch;
		return `${parseInt(hours).toString().padStart(2, '0')}:${minutes}`;
	}

	return timeStr;
}

function extractClassInfo(content: string): ClassInfo | null {
	/**
	 * Extract class information and duration from content
	 */
	if (!content) return null;

	const lines = content.split('\n');
	const durationMatch = content.match(/\(([^)]+)\)/);

	// Remove duration from content for clean display
	const cleanContent = content.replace(/\([^)]+\)/g, '').trim();

	const duration = durationMatch ? durationMatch[1] : undefined;

	return {
		content: cleanContent,
		duration,
		lines,
	};
}

function shouldShowDuration(slotTimeRange: string, actualDuration?: string): boolean {
	/**
	 * Determine if duration should be shown based on time matching
	 */
	if (!actualDuration) return false;

	// Parse slot time range
	const slotParts = slotTimeRange.split('-');
	if (slotParts.length !== 2) return true;

	const slotStart = parseTime24h(slotParts[0].trim());
	const slotEnd = parseTime24h(slotParts[1].trim());

	// Parse actual duration
	const durationParts = actualDuration.split('-');
	if (durationParts.length !== 2) return true;

	const actualStart = parseTime24h(durationParts[0].trim());
	const actualEnd = parseTime24h(durationParts[1].trim());

	// Show duration only if times don't match exactly
	return !(slotStart === actualStart && slotEnd === actualEnd);
}

export function createTableWithColspan(
	scheduleData: { [day: string]: { [timeSlot: string]: string } },
	timeSlots: string[],
	days: string[]
): EnhancedTableStructure {
	/**
	 * Create table structure with colSpan merging for same consecutive content
	 */
	const tableStructure: EnhancedTableStructure = {
		header: ['Day', ...timeSlots],
		rows: [],
	};

	for (const day of days) {
		const daySchedule = scheduleData[day] || {};
		const row: TableRow = { day, cells: [] };

		let i = 0;
		while (i < timeSlots.length) {
			const slot = timeSlots[i];
			const content = daySchedule[slot] || '';

			if (content) {
				// Check for consecutive same content
				let consecutiveCount = 1;
				let j = i + 1;

				while (j < timeSlots.length && (daySchedule[timeSlots[j]] || '') === content) {
					consecutiveCount++;
					j++;
				}

				// Extract class information
				const classInfo = extractClassInfo(content);

				if (classInfo) {
					let displayContent = classInfo.content;

					// Determine if we should show duration
					if (consecutiveCount > 1) {
						// For merged cells, show duration only if it doesn't match the merged time range
						const mergedStart = timeSlots[i].split('-')[0].trim();
						const mergedEnd = timeSlots[i + consecutiveCount - 1].split('-')[1].trim();
						const mergedRange = `${mergedStart}-${mergedEnd}`;

						if (shouldShowDuration(mergedRange, classInfo.duration)) {
							displayContent += `\n(${classInfo.duration})`;
						}
					} else {
						// For single cells, show duration if it doesn't match the slot time
						if (shouldShowDuration(slot, classInfo.duration)) {
							displayContent += `\n(${classInfo.duration})`;
						}
					}

					row.cells.push({
						content: displayContent,
						colspan: consecutiveCount,
						style: 'scheduleCell',
					});
				} else {
					row.cells.push({
						content: '',
						colspan: consecutiveCount,
						style: 'scheduleCell',
					});
				}

				i += consecutiveCount;
			} else {
				// Empty cell
				row.cells.push({
					content: '',
					colspan: 1,
					style: 'scheduleCell',
				});
				i++;
			}
		}

		tableStructure.rows.push(row);
	}

	return tableStructure;
}

export function convertTableStructureToPdfMake(tableStructure: EnhancedTableStructure): any[][] {
	/**
	 * Convert enhanced table structure to PDFMake table body format
	 */
	const pdfTableBody: any[][] = [];

	// Add header row
	pdfTableBody.push(
		tableStructure.header.map((header) => ({
			text: header,
			style: header === 'Day' ? 'dayCell' : 'headerCell',
			bold: true,
		}))
	);

	// Add data rows
	for (const row of tableStructure.rows) {
		const pdfRow: any[] = [{ text: row.day, style: 'dayCell' }];

		for (const cell of row.cells) {
			const cellDef: any = {
				text: cell.content,
				style: cell.style,
			};

			if (cell.colspan > 1) {
				cellDef.colSpan = cell.colspan;
			}

			pdfRow.push(cellDef);

			// Add empty cells for colspan
			for (let i = 1; i < cell.colspan; i++) {
				pdfRow.push({});
			}
		}

		pdfTableBody.push(pdfRow);
	}

	return pdfTableBody;
}
