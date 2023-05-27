<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { SelectData } from "@gradio/utils";
	import { BlockLabel, Empty, IconButton } from "@gradio/atoms";
	import { Download, Clear } from "@gradio/icons";
	import { get_coordinates_of_clicked_image } from "./utils";

	import { Image } from "@gradio/icons";

	export let value: null | string;
	export let label: string | undefined = undefined;
	export let show_label: boolean;
	export let selectable: boolean = false;
 export let imageWidth: number = 0;
 export let imageHeight: number = 0;
 let imageElem: HTMLImageElement | null = null;

	const dispatch = createEventDispatcher<{
		change: string;
		select: SelectData;
	}>();

	$: value && dispatch("change", value);

 $: if (value == null || !imageElem) {
     imageWidth = 0;
     imageHeight = 0;
 }

	const handle_click = (evt: MouseEvent) => {
		let coordinates = get_coordinates_of_clicked_image(evt);
		if (coordinates) {
			dispatch("select", { index: coordinates, value: null });
		}
	};

 function remove() {
     value = null;
 }
</script>

<BlockLabel {show_label} Icon={Image} label={label || "Image"} />
{#if value === null}
	<Empty size="large" unpadded_box={true}><Image /></Empty>
{:else}
	<div class="buttons">
		<a
			href={value}
			target={window.__is_colab__ ? "_blank" : null}
			download={"image"}
		>
			<IconButton Icon={Download} label="Download" />
		</a>
        <IconButton Icon={Clear} label="Remove" on:click={remove} />
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img src={value} alt="" class:selectable on:click={handle_click} bind:naturalWidth={imageWidth} bind:naturalHeight={imageHeight} />
{/if}

<style>
	img {
		width: var(--size-full);
		height: var(--size-full);
		object-fit: contain;
	}

	.selectable {
		cursor: crosshair;
	}

	.buttons {
		display: flex;
		position: absolute;
		top: var(--size-2);
		right: var(--size-2);
		justify-content: flex-end;
		gap: var(--spacing-sm);
		z-index: var(--layer-5);
	}
</style>
