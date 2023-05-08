<script lang="ts">
	export let type: "video" | "image" | "audio" | "file" | "csv" = "file";

	const defs = {
		image: "interface.drop_image",
		video: "interface.drop_video",
		audio: "interface.drop_audio",
		file: "interface.drop_file",
		csv: "interface.drop_csv"
	};
</script>

<div class="wrap">
	{"Drop Image here"}
	<span class="or">- {"or"} -</span>
	{"Click to Upload"}
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: var(--size-60);
		color: var(--block-label-text-color);
		line-height: var(--line-md);
	}

	.or {
		color: var(--body-text-color-subdued);
	}

	@media (--screen-md) {
		.wrap {
			font-size: var(--text-lg);
		}
	}
</style>
