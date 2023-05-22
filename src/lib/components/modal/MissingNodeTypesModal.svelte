<script lang="ts">
 export let missingNodeTypes: Set<string> = new Set();
</script>

<div>
    When loading the graph, the following node types were not found:
    <ul>
        {#each Array.from(missingNodeTypes) as type}
            <li>{type}</li>
        {/each}
    </ul>
    Nodes that have failed to load will show as red on the graph.
</div>

<style lang="scss">
 div {
     padding: 1rem;
 }
 ul {
     padding-left: 2rem;

     > li {
         font-weight: bold;
     }
 }
</style>
