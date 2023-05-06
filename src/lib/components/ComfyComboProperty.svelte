<script lang="ts">
 import { BlockTitle } from "@gradio/atoms";
	import { createEventDispatcher } from "svelte";

 export let value: string = "";
 export let values: string[] = [""];
 export let name: string = "";
 export let disabled: boolean = false;
 let value_: string = ""

 $: value;
 $: handleChange(value);

 const dispatch = createEventDispatcher<{
     change: string;
     submit: undefined;
     blur: undefined;
 }>();

 function handleChange(val: string) {
     console.debug("combo handleChange", val, value_)
     if (val != value_)
         dispatch("change", val);
     value_ = val
 }
</script>

<label class="select-wrapper">
    <BlockTitle>{name}</BlockTitle>
    <div class="select">
        <select on:blur bind:value {disabled}>
            {#each values as value}
                <option {value}>
                    {value}
                </option>
            {/each}
        </select>
    </div>
</label>

<style lang="scss">
 .select-wrapper {
     width: 100%;

     .select {
         width: 100%;

         select {
             width: 100%
         }
     }
 }

 .select-title {
     padding: 0.2rem;
 }

 input:disabled {
     cursor: not-allowed;
 }
</style>
