import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'room-allocation-global-settings';

export interface GlobalSettings {
	timeSlotDuration: number; // in minutes
	startHour: number; // 24-hour format
	endHour: number; // 24-hour format
}

const DEFAULT_SETTINGS: GlobalSettings = {
	timeSlotDuration: 10, // 10 minutes
	startHour: 9, // 9 AM
	endHour: 19, // 7 PM
};

export function useGlobalSettings() {
	const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load settings from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsedSettings = JSON.parse(stored) as Partial<GlobalSettings>;

				// Validate and merge with defaults
				const validatedSettings: GlobalSettings = {
					timeSlotDuration:
						validateTimeSlotDuration(parsedSettings.timeSlotDuration) || DEFAULT_SETTINGS.timeSlotDuration,
					startHour: validateHour(parsedSettings.startHour) || DEFAULT_SETTINGS.startHour,
					endHour: validateHour(parsedSettings.endHour) || DEFAULT_SETTINGS.endHour,
				};

				// Ensure end hour is after start hour
				if (validatedSettings.endHour <= validatedSettings.startHour) {
					validatedSettings.endHour = validatedSettings.startHour + 1;
				}

				setSettings(validatedSettings);
			}
		} catch (error) {
			console.warn('Failed to load global settings:', error);
		} finally {
			setIsLoaded(true);
		}
	}, []);

	// Save settings to localStorage
	const updateSettings = useCallback(
		(newSettings: Partial<GlobalSettings>) => {
			try {
				const updatedSettings = { ...settings, ...newSettings };

				// Validate settings
				if (newSettings.timeSlotDuration !== undefined) {
					updatedSettings.timeSlotDuration =
						validateTimeSlotDuration(newSettings.timeSlotDuration) || settings.timeSlotDuration;
				}

				if (newSettings.startHour !== undefined) {
					updatedSettings.startHour = validateHour(newSettings.startHour) || settings.startHour;
				}

				if (newSettings.endHour !== undefined) {
					updatedSettings.endHour = validateHour(newSettings.endHour) || settings.endHour;
				}

				// Ensure end hour is after start hour
				if (updatedSettings.endHour <= updatedSettings.startHour) {
					updatedSettings.endHour = updatedSettings.startHour + 1;
				}

				setSettings(updatedSettings);
				localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
			} catch (error) {
				console.warn('Failed to save global settings:', error);
			}
		},
		[settings]
	);

	// Reset to default settings
	const resetToDefaults = useCallback(() => {
		try {
			setSettings(DEFAULT_SETTINGS);
			localStorage.removeItem(STORAGE_KEY);
		} catch (error) {
			console.warn('Failed to reset global settings:', error);
		}
	}, []);

	return {
		settings,
		updateSettings,
		resetToDefaults,
		isLoaded,
	};
}

// Validation functions
function validateTimeSlotDuration(duration: unknown): number | null {
	if (typeof duration !== 'number') return null;
	if (duration < 1 || duration > 60) return null; // 1-60 minutes
	return duration;
}

function validateHour(hour: unknown): number | null {
	if (typeof hour !== 'number') return null;
	if (hour < 0 || hour > 23) return null; // 0-23 hours
	return hour;
}
