<script lang="ts">
	import { fileIcon } from '$lib/fileIcon.js';
	import { isDir, type FileEntry, readDir } from '$lib/fs';
	import { open } from '@tauri-apps/api/shell';
	import { onMount, tick } from 'svelte';
	export let data;

	export let selected: Map<string, boolean> = new Map();

	let files: FileEntry[] = [];

	$: {
		// Replace "//" with "/" to avoid double slashes
		data.path = data.path.replace(/\/\//g, '/');
		console.log(data.path);
		readDir(data.path).then((res) => {
			files = res;
		});
	}

	function openFile(file: FileEntry) {
		if (isDir(file)) {
			return;
			4;
		}
		open(file.path);
	}
</script>

<div class="file-flex p-2 justify-start gap-2">
	<!-- promise was fulfilled -->

	{#each files as file}
		{#if isDir(file)}
			<a
				href={encodeURIComponent(file.path)}
				class="btn btn-square btn-ghost w-24 h-24 text-center"
			>
				<div>
					<!-- FIle icon font awesome  2x size -->
					<i class=" fa-solid fa-folder text-4xl" /> <br />
					<span class="[overflow-wrap:anywhere]">
						{file.name}
					</span>
				</div>
			</a>
		{:else}
			<button
				on:click={() => openFile(file)}
				class="btn btn-square btn-ghost w-24 h-24 text-center overflow-clip"
			>
				<div>
					<i class="fa-solid {fileIcon(file.name)} text-4xl" /> <br />
					<span class="[overflow-wrap:anywhere]">
						{file.name}
					</span>
				</div>
			</button>
		{/if}
	{/each}
</div>

<style>
	.file-flex {
		display: flex;
		flex-wrap: wrap;
	}
</style>
