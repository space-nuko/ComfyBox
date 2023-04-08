<script lang="ts">
 import queueState from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";

 function getNodeInfo(nodeId: number): string {
     let app = (window as any).app;
     if (!app)
         return String(nodeId);

     const title = app.lGraph.getNodeById(nodeId)?.title || String(nodeId);
     return title + " (" + nodeId + ")"
 }
</script>

<div class="queue">
    <div class="bottom">
        {#if $queueState.runningNodeId || $queueState.progress}
            <div class="node-name">
                <span>Node: {getNodeInfo($queueState.runningNodeId)}</span>
            </div>
            <div>
                <ProgressBar value={$queueState.progress?.value} max={$queueState.progress?.max} />
            </div>
        {/if}
        {#if typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0}
            <div class="queue-remaining in-progress">
                <div>
                    Queued prompts: {$queueState.queueRemaining}.
                </div>
            </div>
        {:else}
            <div class="queue-remaining done">
                <div>
                    Nothing queued.
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
 .queue-remaining {
     height: 5em;
     width: 100%;
     text-align: center;
     border: 5px solid #CCC;
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 .node-name {
     border: 5px solid #CCC;
     background-color: var(--color-red-300);
     padding: 0.2em;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 .bottom {
     width: 100%;
     height: auto;
     position: absolute;
     bottom: 0;
     padding: 0.5em;
 }

 .in-progress {
     background-color: var(--secondary-300);
 }
 .done {
     background-color: var(--color-grey-200);
 }

 .queue-item {
     height: 1.5em;
     width: 10em;
     text-align: center;
     border: 1px solid black;
 }
</style>
