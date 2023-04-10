<script lang="ts">
	import { readDir, type FileEntry } from '$lib/fs';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let file: FileEntry;

	export let icon = 'fa-folder';

	export let expanded = false;
	export let padding = 0;

	// Check if the file has folders: aka any children has "children" that is not null
	$: isExpandable =
		file.children == null || file.children?.some((child) => child.children !== null);

	function toggleExpand(event: MouseEvent) {
		event.preventDefault();
		expanded = !expanded;
	}

	function onClick() {
		if (file.path) {
			const link = `/folder/${encodeURIComponent(file.path)}`;
			// navigate(link);
			goto(link);
		}
	}

	onMount(() => {
		if (file.children && file.children.length === 0) {
			const children = readDir(file.path);
			children.then((tree) => {
				file.children = tree;
			});
		}
	});
</script>

<!-- Collapsable list item -->
{#if file.children}
	<li class="whitespace-nowrap overflow-clip">
		<a
			href={file.path ? `/folder/${encodeURIComponent(file.path)}` : '#'}
			style="padding-left: {(padding + 1) * 0.25}rem"
		>
			<!-- Strip first -->
			<div>
				{#if isExpandable}
					<button on:click={toggleExpand} class="w-4 hover:text-accent transition">
						{#if !expanded}
							<i class="fa-solid fa-chevron-right" />
						{:else}
							<i class="fa-solid fa-chevron-down" />
						{/if}
					</button>
					<i class="fa-solid {icon}" />
					{file.name}
				{:else}
					<i class="pl-5 fa-solid {icon}" />
					{file.name}
				{/if}
			</div>
		</a>
	</li>
{/if}

{#if expanded}
	{#each file.children || [] as folder}
		<svelte:self file={folder} padding={padding + 5} icon={folder.icon} />
	{/each}
{/if}
