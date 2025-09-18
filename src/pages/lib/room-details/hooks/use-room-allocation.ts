import { useCallback, useEffect, useState } from 'react';
import { useRoomAllocationData } from '@/pages/lib/config/query';

import { api } from '@/lib/api';
import { BASE_API } from '@/lib/secret';

import type { Room, RoomAllocation, Weekday } from '../lib/types';

export function useRoomAllocation(semesterId: string) {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [allocations, setAllocations] = useState<RoomAllocation[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
	const [selectedDay, setSelectedDay] = useState<Weekday | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { data } = useRoomAllocationData(`room_uuid=${selectedRoom?.uuid}&semester_uuid=${semesterId}`);

	const fetchRooms = useCallback(async () => {
		setLoading(true);
		try {
			// Replace with actual API call
			const response = await api.get(`${BASE_API}/lib/room`);
			setRooms(response.data);
		} catch (err: any) {
			setError('Failed to fetch rooms');
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchRoomAllocations = useCallback(
		async (roomId: string) => {
			setLoading(true);
			try {
				// Replace with actual API callx

				// response.data is the actual data
				setAllocations(data as RoomAllocation[]);
			} catch (err: any) {
				console.error('Failed to fetch room allocations:', err);
				setError(`Failed to fetch room allocations: ${err?.message || err}`);
			} finally {
				setLoading(false);
			}
		},
		[semesterId, data]
	);

	const deleteAllocation = useCallback(async (allocationId: string) => {
		try {
			// Replace with actual API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Remove from local state
			setAllocations((prev) => prev.filter((allocation) => allocation.uuid !== allocationId));

			console.log('Deleted allocation:', allocationId);
		} catch (err) {
			setError('Failed to delete allocation');
			throw err;
		}
	}, []);

	const selectRoom = useCallback(
		(room: Room) => {
			setSelectedRoom(room);
			setSelectedDay(null);
			fetchRoomAllocations(room.uuid);
		},
		[fetchRoomAllocations]
	);

	useEffect(() => {
		fetchRooms();
	}, [fetchRooms]);

	return {
		rooms,
		allocations,
		selectedRoom,
		selectedDay,
		loading,
		error,
		selectRoom,
		setSelectedDay,
		deleteAllocation,
	};
}
