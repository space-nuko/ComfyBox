<script lang="ts">
	import type { ComfyDevice } from "$lib/api";
	import systemState from "$lib/stores/systemState";

 export let value: number | null = null;
 export let max: number | null = null;
 export let classes: string = "";
 export let styles: string = "";
 let percent: number = 0;
 let totalGB: string = "";
 let usedGB: string = "";
 let text: string = ""

 let device: ComfyDevice | null = null;
 $: device = $systemState.devices[0]

 function toGB(bytes: number): string {
     return (bytes / 1024 / 1024 / 1024).toFixed(1)
 }

 $: if (device) {
     percent = (1 - (device.vram_free / device.vram_total)) * 100;
     totalGB = toGB(device.vram_total);
     usedGB = toGB(device.vram_total - device.vram_free);
     text = `${usedGB} / ${totalGB}GB (${percent.toFixed(1)}%)`
 } else {
     percent = 0
     totalGB = ""
     usedGB = ""
     text = "??.?%"
 }
</script>

<div class="progress {classes}" style={styles}>
    <div class="bar" style="width: {percent}%;">
        <span class="label">VRAM: {text}</span>
    </div>
</div>

<style>
 .progress {
     height: 18px;
     margin: 5px;
     text-align: center;
     color: var(--neutral-400);
     border: 1px solid var(--neutral-500);
     padding: 0px;
     position: relative;
 }

 .bar {
     height: 100%;
     background: var(--secondary-800);
 }

 .label {
     font-size: 8pt;
     position: absolute;
     margin: 0;
     left: 0;
     right: 0;
     top: 50%;
     transform: translateY(-50%);
 }
</style>
