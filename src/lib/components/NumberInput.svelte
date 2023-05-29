
<script lang="ts">
	import { BlockTitle } from "@gradio/atoms";
	import { createEventDispatcher } from "svelte";

 export let value: number = 0;
 export let min: number | null = null
 export let max: number | null = null
 export let step: number = 1;
 export let label: string = "";
 export let disabled: boolean = false;
 let inputValue = value;

 const dispatch = createEventDispatcher<{ change: number; release: number }>();

 function handle_input(e: Event) {
     const element = e.currentTarget as HTMLInputElement;
     let newValue = parseFloat(element.value);
     if (isNaN(newValue)) {
         newValue = min;
     }
     inputValue = Math.min(Math.max(inputValue, min), max);
     value = inputValue;
     dispatch("release", value);
 }

 function handle_release(e: MouseEvent) {
     dispatch("release", value);
 }

 $: {
     inputValue = value;
     dispatch("change", value);
 }

 const clamp = () => {
     value = Math.min(Math.max(value, min), max);
     dispatch("release", value);
 };
</script>

<div class="wrap">
    <div class="head">
        {#if label}
            <label>
                <BlockTitle>{label}</BlockTitle>
            </label>
        {/if}
        <input
            data-testid="number-input"
            type="number"
            bind:value={inputValue}
            on:input={handle_input}
            min={min}
            max={max}
            on:blur={clamp}
            {step}
            {disabled}
            on:pointerup={handle_release}
        />
    </div>
</div>

<style lang="scss">
 .wrap {
     display: flex;
     flex-direction: column;
     width: 100%;
     height: 100%;
 }

 .head {
     display: flex;

     > label {
         padding: 0.5rem 1.0rem;
     }
 }
 input[type="number"] {
     display: block;
     width: 100%;
     position: relative;
     outline: none !important;
     box-shadow: var(--input-shadow);
     border: var(--input-border-width) solid var(--input-border-color);
     border-radius: var(--input-radius);
     background: var(--input-background-fill);
     padding: var(--input-padding);
     color: var(--body-text-color);
     font-size: var(--input-text-size);
     line-height: var(--line-sm);
     // text-align: center;
 }
 input:disabled {
     -webkit-text-fill-color: var(--body-text-color);
     -webkit-opacity: 1;
     opacity: 1;
 }

 input[type="number"] {
     &:focus {
         box-shadow: var(--input-shadow-focus);
         border-color: var(--input-border-color-focus);
     }

     &::-webkit-inner-spin-button,
     &::-webkit-outer-spin-button {
         opacity: 100%;
     }
 }

 input::placeholder {
     color: var(--input-placeholder-color);
 }

 input[disabled] {
     cursor: not-allowed;
 }

</style>
