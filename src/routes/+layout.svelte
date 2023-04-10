<!-- File explorer clone -->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import NavPanel from '$lib/components/NavPanel.svelte';

	let drag: HTMLElement;
	let leftPanel: HTMLElement;

	let startX: number;
	let startWidth: number;
	let minPanelWidth = 100; // Both panels should have a minimum width

	function handleMouseDown(event: MouseEvent) {
		startX = event.clientX;
		startWidth = leftPanel.offsetWidth;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		const dx = event.clientX - startX;
		if (startWidth + dx < minPanelWidth) return;

		if (startWidth + dx > window.innerWidth - minPanelWidth) return;

		leftPanel.style.width = `${startWidth + dx}px`;
	}

	function handleMouseUp() {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			// F5 to reload
			if (event.key === 'F5') {
				location.reload();
			}

			// Alt + Left Arrow to go back
			if (event.key === 'ArrowLeft' && event.altKey) {
				history.back();
			}

			// Alt + Right Arrow to go forward
			if (event.key === 'ArrowRight' && event.altKey) {
				history.forward();
			}

			// Keypad return to go back
			if (event.key === 'Backspace') {
				history.back();
			}
		});
	});
</script>

<div class="wrapper">
	<div bind:this={leftPanel} class="left-panel overflow-auto">
		<NavPanel />
	</div>
	<div bind:this={drag} class="sep-drag" on:mousedown={handleMouseDown} />
	<div class="folder-content overflow-auto">
		<slot />
	</div>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(body) {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.wrapper {
		height: 100vh;
		max-height: 100vh;
		display: flex;
		flex-direction: row;
	}

	.left-panel {
		width: 200px;
		height: 100%;
	}

	.sep-drag {
		width: 4px;
		height: 100%;
		background-color: hsl(var(--nc));
		cursor: col-resize;
	}

	.folder-content {
		flex: 1;
		height: 100%;
	}
</style>
