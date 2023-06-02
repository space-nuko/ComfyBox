<!--
     A "journey" is like browser history for prompts, except organized in a
     tree-like graph. It lets you save incremental changes to your workflow and
     jump between past and present sets of parameters.
-->
<script lang="ts">
 import Graph from './graph/Graph.svelte'
 import GraphNode from './graph/GraphNode.svelte'
 import GraphEdge from './graph/GraphEdge.svelte'

 import type ComfyApp from './ComfyApp';

 export let app: ComfyApp;

 const nodes = [
     { id: 'N1', label: 'Start' },
     { id: 'N2', label: '4' },
     { id: 'N4', label: '8' },
     { id: 'N5', label: '15' },
     { id: 'N3', label: '16' },
     { id: 'N6', label: '23' },
     { id: 'N7', label: '42' },
     { id: 'N8', label: 'End' }
 ]

 const edges = [
     { id: 'E1', source: 'N1', target: 'N2' },
     { id: 'E2', source: 'N2', target: 'N3' },
     { id: 'E3', source: 'N3', target: 'N6' },
     { id: 'E4', source: 'N2', target: 'N4' },
     { id: 'E5', source: 'N4', target: 'N5' },
     { id: 'E6', source: 'N5', target: 'N4', label: '2' },
     { id: 'E7', source: 'N5', target: 'N6' },
     { id: 'E8', source: 'N6', target: 'N7' },
     { id: 'E9', source: 'N7', target: 'N7', label: '3' },
     { id: 'E10', source: 'N7', target: 'N8' }
 ]
</script>

<div class="journey-view">
    <Graph>
        {#each nodes as node}
            <GraphNode node={node}/>
        {/each}

        {#each edges as edge}
            <GraphEdge edge={edge}/>
        {/each}
    </Graph>
</div>

<style lang="scss">
 .journey-view {
     width: 100%;
     height: 100%;
 }
</style>
