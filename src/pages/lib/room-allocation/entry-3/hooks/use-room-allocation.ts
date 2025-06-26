import { useCallback, useEffect, useState } from 'react';

import type { Room, RoomAllocation, Weekday } from '../lib/types';

// Mock API functions - replace with actual API calls
const mockRooms: Room[] = [
	{ uuid: '1', name: 'Computer Lab A', type: 'lab', location: 'Building A, Floor 2', capacity: 30 },
	{ uuid: '2', name: 'Lecture Hall 101', type: 'general', location: 'Building B, Floor 1', capacity: 100 },
	{ uuid: '3', name: 'Meeting Room 1', type: 'general', location: 'Building C, Floor 3', capacity: 15 },
	{ uuid: '4', name: 'Physics Lab', type: 'lab', location: 'Building A, Floor 1', capacity: 25 },
];

const mockAllocations: RoomAllocation[] = [
	{ uuid: '1', room_uuid: '1', sem_crs_thr_entry_uuid: 'sem1', day: 'mon', from: '09:00', to: '10:00' },
	{ uuid: '2', room_uuid: '1', sem_crs_thr_entry_uuid: 'sem2', day: 'mon', from: '10:00', to: '11:00' },
	{ uuid: '3', room_uuid: '1', sem_crs_thr_entry_uuid: 'sem3', day: 'mon', from: '14:00', to: '15:00' },
	{ uuid: '4', room_uuid: '2', sem_crs_thr_entry_uuid: 'sem4', day: 'wed', from: '13:00', to: '15:00' },
	{ uuid: '5', room_uuid: '1', sem_crs_thr_entry_uuid: 'sem5', day: 'tue', from: '18:00', to: '19:00' },
];

export function useRoomAllocation(semesterId: string) {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [allocations, setAllocations] = useState<RoomAllocation[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
	const [selectedDay, setSelectedDay] = useState<Weekday | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchRooms = useCallback(async () => {
		setLoading(true);
		try {
			// Replace with actual API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			setRooms(mockRooms);
		} catch (err) {
			setError('Failed to fetch rooms');
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchRoomAllocations = useCallback(async (roomId: string) => {
		setLoading(true);
		try {
			// Replace with actual API call
			await new Promise((resolve) => setTimeout(resolve, 300));
			const roomAllocations = mockAllocations.filter((allocation) => allocation.room_uuid === roomId);
			setAllocations(roomAllocations);
		} catch (err) {
			setError('Failed to fetch room allocations');
		} finally {
			setLoading(false);
		}
	}, []);

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
