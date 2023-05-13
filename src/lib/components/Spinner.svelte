<span class="loader" {...$$restProps}/>

<style lang="scss">
$border-bottom-color_1: var(--comfy-spinner-accent-color);

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.loader {
	width: 48px;
	height: 48px;
	border: 5px solid var(--comfy-spinner-main-color);
	border-bottom-color: $border-bottom-color_1;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 2s linear infinite;
}
</style>
