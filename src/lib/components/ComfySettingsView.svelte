<script lang="ts">
 import { CONFIG_CATEGORIES, CONFIG_DEFS_BY_CATEGORY, CONFIG_DEFS_BY_NAME, type ConfigDefAny, type ConfigDefEnum, type ConfigState } from "$lib/stores/configDefs";
 import { capitalize } from "$lib/utils";
 import { Checkbox } from "@gradio/form";
 import configState from "$lib/stores/configState";
 import type ComfyApp from "./ComfyApp";
 import NumberInput from "./NumberInput.svelte";
 import Textbox from "@gradio/form/src/Textbox.svelte";
 import { Button } from "@gradio/button";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import notify from "$lib/notify";

 export let app: ComfyApp

 let selectedCategory = CONFIG_CATEGORIES[0];
 let changes: Partial<Record<keyof ConfigState, any>> = {}

 const toastOptions = {
     intro: { duration: 200 },
     theme: {
         '--toastBarHeight': 0
     }
 }

 function selectCategory(category: string) {
     selectedCategory = category;
 }

 function setOption(def: ConfigDefAny, value: any) {
     if (!configState.validateConfigOption(def, value)) {
         console.warn(`[configState] Invalid value for option ${def.name} (${value}), setting to default (${def.defaultValue})`);
         value = def.defaultValue
     }
     changes[def.name] = value;
 }

 function setEnumOption(def: ConfigDefEnum<any, any>, e: Event): void {
     const select = e.target as HTMLSelectElement;
     const index = select.selectedIndex
     setOption(def, def.options.values[index].value)
 }

 function doSave() {
     for (const [k, v] of Object.entries(changes)) {
         const def = CONFIG_DEFS_BY_NAME[k]
         configState.setConfigOption(def, v, true);
     }
     changes = {};
     const json = JSON.stringify($configState);
     localStorage.setItem("config", json);
     notify("Config applied!", { type: "success" })
 }

 function doReset() {
     if (!confirm("Are you sure you want to reset the config to the defaults?"))
         return;

     configState.loadDefault(true);
     notify("Config reset!")
 }
</script>

<div class="comfy-settings">
    <div class="comfy-settings-categories">
        {#each CONFIG_CATEGORIES as category}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="comfy-settings-category" class:selected={selectedCategory === category} on:click={() => selectCategory(category)}>
                {capitalize(category)}
            </div>
        {/each}
    </div>
    <div class="comfy-settings-main">
        {#if selectedCategory}
            {@const categoryDefs = CONFIG_DEFS_BY_CATEGORY[selectedCategory]}
            {#key $configState}
                <div class="comfy-settings-entries">
                    {#each categoryDefs as def}
                        {@const value = $configState[def.name]}
                        <div class="comfy-settings-entry">
                            <div class="name">{def.name}</div>
                            {#if def.type === "boolean"}
                                <span class="ctrl checkbox">
                                    <Checkbox label={def.description} {value} on:change={(e) => setOption(def, e.detail)} />
                                </span>
                            {:else if def.type === "number"}
                                <div class="description">{def.description}</div>
                                <span class="ctrl number">
                                    <NumberInput label="" min={def.options.min} max={def.options.max} step={def.options.step} {value} on:release={(e) => setOption(def, e.detail)} />
                                </span>
                            {:else if def.type === "string"}
                                <div class="description">{def.description}</div>
                                <span class="ctrl textbox">
                                    <Textbox label="" lines={1} max_lines={1} {value} on:change={(e) => setOption(def, e.detail)} />
                                </span>
                            {:else if def.type === "string[]"}
                                <div class="description">{def.description}</div>
                                <span class="ctrl string-array">
                                    {value.join(",")}
                                </span>
                            {:else if def.type === "enum"}
                                <div class="description">{def.description}</div>
                                <span class="ctrl enum">
                                    <select id="ui-theme" name="ui-theme" on:change={(e) => setEnumOption(def, e)}>
                                        {#each def.options.values as option, i}
                                            {@const selected = def.options.values[i].value === value}
                                            <option value={option.value} {selected}>{option.label}</option>
                                        {/each}
                                    </select>
                                </span>
                            {:else}
                                (Unknown config type {def.type})
                            {/if}
                        </div>
                    {/each}
                </div>
            {/key}
        {:else}
            Please select a category.
        {/if}
        <div class="comfy-settings-bottom-bar">
            <div>
                <div class="left">
                    <Button variant="secondary" on:click={doReset}>
                        Reset
                    </Button>
                </div>
                <div class="right">
                    <Button variant="primary" on:click={doSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    </div>
    <SvelteToast options={toastOptions} />
</div>

<style lang="scss">
 $bottom-bar-height: 5rem;

 .comfy-settings {
     color: var(--body-text-color);
     display: flex;
     flex-direction: row;
     width: 100%;
     height: 100%;
 }

 .comfy-settings-categories {
     width: 20rem;
     height: 100%;
     color: var(--neutral-500);
     background: var(--neutral-800);
     border-left: 2px solid var(--comfy-splitpanes-background-fill);
 }

 .comfy-settings-category {
     padding: 2rem 3rem;
     font-size: 14pt;

     border-bottom: 1px solid grey;
     cursor: pointer;

     &.selected {
         color: var(--body-text-color);
         background: var(--neutral-700);
     }
 }

 .comfy-settings-main {
     width: 100%;
     height: calc(100% - $bottom-bar-height);
 }

 .comfy-settings-entries {
     padding: 3rem 3rem;
     height: 100%;
 }

 .comfy-settings-entry {
     padding: 1rem 3rem;

     .name {
         font-weight: bold;
         font-size: 13pt;
     }

     .description {
         font-size: 11pt;
         color: var(--neutral-400);
     }

     .ctrl {
         margin-top: 0.5rem;
         min-width: 5rem;
         display: block;

         &:not(.checkbox) {
             width: 20rem;
         }

         &.textbox {
             :global(span) {
                 display: block !important;
             }
         }

         &.checkbox {
             display: inline-flex !important;
             padding: 0 0.75rem;

             :global(label) {
                 color: var(--neutral-400);
                 font-size: 11pt;
             }
         }

         &.enum {
             select {
                 -webkit-appearance: none;
                 -moz-appearance: none;
                 background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                 background-repeat: no-repeat;
                 background-position-x: 100%;
                 background-position-y: 8px;
             }
         }
     }
 }

 .comfy-settings-bottom-bar {
     background: var(--neutral-900);
     width: 100%;
     border-top: 2px solid var(--neutral-800);
     gap: var(--layout-gap);
     overflow-x: hidden;
     height: $bottom-bar-height;
     justify-content: center;
     padding: 0 2rem;
     margin: auto;
     position: relative;
     flex-direction: column;
     display: flex;

     > div {
         width: 100%;
         display: flex;
         gap: var(--layout-gap);
         margin: auto;
         flex-wrap: nowrap;
     }

     .left {
         left: 0;
     }
     .right {
         margin-left: auto;
     }
 }
</style>
