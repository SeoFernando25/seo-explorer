<script lang="ts">
	import { readDir, type FileEntry } from '$lib/fs';
	import { onMount } from 'svelte';
	import CollapseLi from './CollapseLi.svelte';
	import { homeDir } from '@tauri-apps/api/path';

	export const root = readDir('/');
	let thisPcEntries = [
		{
			name: 'Desktop',
			path: async () => (await homeDir()) + '/Desktop',
			icon: 'fa-pager'
		},
		{
			name: 'Documents',
			path: async () => (await homeDir()) + '/Documents',
			icon: 'fa-file-alt'
		},
		{
			name: 'Downloads',
			path: async () => (await homeDir()) + '/Downloads',
			icon: 'fa-download'
		},
		{
			name: 'Music',
			path: async () => (await homeDir()) + '/Music',
			icon: 'fa-music'
		},
		{
			name: 'Pictures',
			path: async () => (await homeDir()) + '/Pictures',
			icon: 'fa-image'
		},
		{
			name: 'Videos',
			path: async () => (await homeDir()) + '/Videos',
			icon: 'fa-video'
		}
	];

	let thisPC: FileEntry = {
		name: 'This PC',
		path: '',
		children: []
	};

	let entries: {
		name: string;
		icon: string;
		path: string;
		children?: FileEntry[];
	}[] = [];

	onMount(async () => {
		entries = await Promise.all(
			thisPcEntries.map(async (entry) => {
				return {
					...entry,
					path: await entry.path(),
					children: []
				};
			})
		);
		thisPC.children = entries;
	});
</script>

<ul class="menu bg-base-100 w-full">
	<li class="menu-title">
		<span>Root</span>
	</li>
	{#await entries}
		<li>
			<div class="loading loading-lg" />
		</li>
	{:then entries}
		<CollapseLi file={thisPC} icon="fa-desktop" />
	{/await}
</ul>
