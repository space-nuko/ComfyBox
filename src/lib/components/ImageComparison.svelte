<script lang="ts">
 import 'img-comparison-slider';

 export let value: number = 50;
 export let hover: boolean = false;
 export let direction: "horizontal" | "vertical" = "horizontal";
 export let nonce: string | null = null;
 export let keyboard: "enabled" | "disabled" = "enabled";
 export let handle: boolean = false;
</script>

<img-comparison-slider {value} {hover} {direction} {nonce} {keyboard} {handle} {...$$restProps}>
    <slot/>
</img-comparison-slider>

<style>
 img-comparison-slider {
     visibility: hidden;
 }

 img-comparison-slider [slot='second'] {
     display: none;
 }

 img-comparison-slider.rendered {
     visibility: inherit;
 }

 img-comparison-slider.rendered [slot='second'] {
     display: unset;
 }
</style>
