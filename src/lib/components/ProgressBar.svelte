<script lang="ts">
 export let value: number | null = null;
 export let max: number | null = null;
 export let classes: string = "";
 export let styles: string = "";
 let percent: number = 0;
 let text: string = ""

 $: if (value && max) {
     percent = (value / max) * 100;
     text = percent.toFixed(1) + "%";
 } else {
     percent = 0
     text = "??.?%"
 }
</script>

<div class="progress {classes}" style={styles}>
    <div class="bar" style="width: {percent}%;">
        <span class="label">{text}</span>
    </div>
</div>

<style>
 .progress {
     height: 30px;
     margin: 5px;
     text-align: center;
     background: var(--comfy-progress-bar-background);
     padding: 0px;
     position: relative;
 }

 .bar {
     height: 100%;
     background: var(--comfy-progress-bar-foreground);
 }

 .label {
     font-size: .9em;
     position: absolute;
     margin: 0;
     left: 0;
     right: 0;
     top: 50%;
     transform: translateY(-50%);
 }
</style>
