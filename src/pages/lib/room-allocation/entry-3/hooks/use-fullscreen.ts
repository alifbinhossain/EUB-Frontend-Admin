import { useCallback, useEffect, useState } from 'react';

export function useFullscreen() {
	const [isFullscreen, setIsFullscreen] = useState(false);

	// Check if fullscreen is supported
	const isSupported =
		typeof document !== 'undefined' &&
		(document.fullscreenEnabled ||
			(document as any).webkitFullscreenEnabled ||
			(document as any).mozFullScreenEnabled ||
			(document as any).msFullscreenEnabled);

	// Update fullscreen state when it changes
	useEffect(() => {
		const handleFullscreenChange = () => {
			const isCurrentlyFullscreen = !!(
				document.fullscreenElement ||
				(document as any).webkitFullscreenElement ||
				(document as any).mozFullScreenElement ||
				(document as any).msFullscreenElement
			);
			setIsFullscreen(isCurrentlyFullscreen);
		};

		// Add event listeners for different browsers
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('mozfullscreenchange', handleFullscreenChange);
		document.addEventListener('MSFullscreenChange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
			document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
		};
	}, []);

	const enterFullscreen = useCallback(
		async (element: HTMLElement) => {
			if (!isSupported) return false;

			try {
				if (element.requestFullscreen) {
					await element.requestFullscreen();
				} else if ((element as any).webkitRequestFullscreen) {
					await (element as any).webkitRequestFullscreen();
				} else if ((element as any).mozRequestFullScreen) {
					await (element as any).mozRequestFullScreen();
				} else if ((element as any).msRequestFullscreen) {
					await (element as any).msRequestFullscreen();
				}
				return true;
			} catch (error) {
				console.error('Failed to enter fullscreen:', error);
				return false;
			}
		},
		[isSupported]
	);

	const exitFullscreen = useCallback(async () => {
		if (!isSupported) return false;

		try {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
			} else if ((document as any).webkitExitFullscreen) {
				await (document as any).webkitExitFullscreen();
			} else if ((document as any).mozCancelFullScreen) {
				await (document as any).mozCancelFullScreen();
			} else if ((document as any).msExitFullscreen) {
				await (document as any).msExitFullscreen();
			}
			return true;
		} catch (error) {
			console.error('Failed to exit fullscreen:', error);
			return false;
		}
	}, [isSupported]);

	const toggleFullscreen = useCallback(
		async (element: HTMLElement) => {
			if (isFullscreen) {
				return await exitFullscreen();
			} else {
				return await enterFullscreen(element);
			}
		},
		[isFullscreen, enterFullscreen, exitFullscreen]
	);

	return {
		isFullscreen,
		isSupported,
		enterFullscreen,
		exitFullscreen,
		toggleFullscreen,
	};
}
