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
    Do you want to convert the workflow into ComfyBox format anyway? (You may lose some workflow state)
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
