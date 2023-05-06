<script lang="ts">
	import { BlockTitle } from "@gradio/atoms";
	import { createEventDispatcher } from "svelte";

 export let value: number = 0;
 export let step: number = 1;
 export let name: string = "";
 let value_: number = 0;

 $: value;
 $: handleChange(value);

 const dispatch = createEventDispatcher<{
     change: number;
     submit: undefined;
     blur: undefined;
 }>();

 function handleChange(val: number) {
     if (val != value_)
         dispatch("change", val);
     value_ = val
 }
</script>

<label class="number-wrapper">
    <BlockTitle>{name}</BlockTitle>
    <div class="number">
        <input type="number" bind:value {step}>
    </div>
</label>

<style lang="scss">
 .number-wrapper {
     width: 100%;

     .number {
         width: 100%;

         input {
             width: 100%
         }
     }
 }
</style>
