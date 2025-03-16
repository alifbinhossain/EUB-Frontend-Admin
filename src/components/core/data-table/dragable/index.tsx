import React, { CSSProperties, useEffect, useState } from 'react';
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row } from '@tanstack/react-table';
import useTable from '@/hooks/useTable';

import { TableBody, TableCell, Table as TableComponent, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { TableColumnHeader } from '../_components/column-header';
import { TablePagination } from '../_components/pagination';
import TableSkeleton from '../_components/skeleton';
import { TableToolbar } from '../_components/toolbar';
import { getCommonPinningStyles } from '../_helpers/getCommonPinningStyle';

const DraggableRow = ({ row }: { row: Row<any> }) => {
	// Use row.id as the sortable ID to match SortableContext
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.id,
	});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
		opacity: isDragging ? 0.8 : 1,
		zIndex: isDragging ? 1 : 0,
		position: 'relative',
	};

	return (
		<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} ref={setNodeRef} style={style}>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={cell.id}
					style={{
						...getCommonPinningStyles({
							column: cell.column,
						}),
					}}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
};

function DataTable() {
	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

	const { table, isLoading, isEntry } = useTable();
	const tableData = table.getRowModel().rows.map((row) => row.original);

	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		if (JSON.stringify(data) !== JSON.stringify(tableData)) {
			setData(tableData);
		}
	}, [tableData]);
	console.log(data);

	// Create an array of row IDs for SortableContext
	const rowIds = data.map((row) => row.id);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active && over && active.id !== over.id) {
			// Find the indices in the data array

			setData((data) => {
				const oldIndex = rowIds.indexOf(active.id);
				const newIndex = rowIds.indexOf(over.id);
				return arrayMove(data, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	return (
		<div>
			<TableToolbar />
			<div className={cn('overflow-hidden border border-secondary/10', isEntry ? 'rounded-b-md' : 'rounded-md')}>
				<DndContext
					collisionDetection={closestCenter}
					modifiers={[restrictToVerticalAxis]}
					onDragEnd={handleDragEnd}
					sensors={sensors}
				>
					<TableComponent>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										const content = header.column.columnDef.header;
										return (
											<TableHead
												key={header.id}
												colSpan={header.colSpan}
												style={{
													...getCommonPinningStyles({
														column: header.column,
														isHeader: true,
													}),
												}}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															typeof content === 'string' ? (
																<TableColumnHeader column={header.column} />
															) : (
																content
															),
															header.getContext()
														)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody className='divide-y-[1px] divide-secondary/10'>
							<SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
								{table.getRowModel().rows.map((row) => (
									<DraggableRow key={row.id} row={row} />
								))}
							</SortableContext>
						</TableBody>
					</TableComponent>
				</DndContext>
				<TablePagination />
			</div>
		</div>
	);
}

export default DataTable;
