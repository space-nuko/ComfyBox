<!--
     A "journey" is like browser history for prompts, except organized in a
     tree-like graph. It lets you save incremental changes to your workflow and
     jump between past and present sets of parameters.
-->
<script lang="ts">
 import type ComfyApp from './ComfyApp';
 import type { ComfyBoxWorkflow } from '$lib/stores/workflowState';
 import workflowState from '$lib/stores/workflowState';
 import type { WritableJourneyStateStore } from '$lib/stores/journeyStates';
 import JourneyRenderer from './JourneyRenderer.svelte';

 export let app: ComfyApp;

 let workflow: ComfyBoxWorkflow;
 let journey: WritableJourneyStateStore

 $: workflow = $workflowState.activeWorkflow
 $: journey = workflow?.journey
</script>

<div class="journey-view">
    <JourneyRenderer {workflow} {journey} />
</div>

<style lang="scss">
 .journey-view {
     width: 100%;
     height: 100%;
 }
</style>
