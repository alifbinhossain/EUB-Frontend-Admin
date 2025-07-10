'use client';

import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { IReportDepartmentEvaluationSemesterTableData } from '../config/columns/columns.type';

export const description = 'A linear area chart';

const chartConfig = {
	average: {
		label: 'Average',
		color: '#2563eb',
	},
} satisfies ChartConfig;

export function ChartAreaLinear({ data }: { data: IReportDepartmentEvaluationSemesterTableData }) {
	const transformedData = useMemo(() => {
		return Object.entries(data).map(([key, value]) => {
			// Transform the key (e.g., "spring_2019" to "Spring 2019")
			const semester = key.split('_').join(' ').toUpperCase();
			return { semester: semester, average: value };
		});
	}, [data]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Semester Wise Average - Linear</CardTitle>
				<CardDescription>Showing semester wise average scenario</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='h-40 w-full'>
					<AreaChart accessibilityLayer data={transformedData} margin={{ left: 40, right: 40 }}>
						<CartesianGrid vertical={true} />
						<XAxis
							dataKey='semester'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value}
						/>{' '}
						<YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMax', 'dataMax + 5']} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' hideLabel />} />
						<Area dataKey='average' type='linear' fill='#60a5fa' fillOpacity={0.3} stroke='#2563eb' />
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className='flex w-full items-start gap-2 text-sm'>
					<div className='grid gap-2'>
						{/* <div className='flex items-center gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div> */}
						<div className='flex items-center gap-2 leading-none text-muted-foreground'>
							{transformedData[0]?.semester} - {transformedData[transformedData.length - 1]?.semester}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
