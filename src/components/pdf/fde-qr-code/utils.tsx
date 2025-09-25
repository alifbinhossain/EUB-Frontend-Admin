import { EUB_LOGO } from '@/assets/images/base64';
import { IFDEListTableData } from '@/pages/fde/config/columns/columns.type';

import { DEFAULT_FONT_SIZE } from '../ui';

export const getPageHeader = (data: IFDEListTableData, type: 'mid' | 'final') => {
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: ['*'],
		body: [
			[
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
									text: 'Proposed Course Evaluation Survey (CES)',
									bold: true,
									alignment: 'center',
									colSpan: 3,
									fontSize: DEFAULT_FONT_SIZE + 5,
								},
								'',
								'',
							],
							[
								{
									text: `${data?.semester_name}: ${type.toUpperCase()} Evaluation`,
									bold: true,
									alignment: 'center',
									colSpan: 3,
									fontSize: DEFAULT_FONT_SIZE + 5,
								},
								'',
								'',
							],
							[
								{
									text: `${data?.course_code}: ${data?.course_name} (${data?.course_section_name})`,
									bold: true,
									alignment: 'center',
									colSpan: 3,
									fontSize: DEFAULT_FONT_SIZE + 5,
								},
								'',
								'',
							],
							[
								{
									text: data?.teacher_name,
									bold: true,
									alignment: 'center',
									colSpan: 3,
									fontSize: DEFAULT_FONT_SIZE + 5,
								},
								'',
								'',
							],
						],
					},
					layout: 'noBorders',
				},
			],

			// * Start of table
		],
	};
};
