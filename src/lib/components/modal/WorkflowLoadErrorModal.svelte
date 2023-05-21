<script lang="ts">
 export let error: Error;
</script>

<div>
    Loading aborted due to error reloading workflow data:
    <div class="error-block">
        <pre class="error">
            {error.toString()}
        </pre>
        <pre class="stack">
            {error?.stack || "(No stacktrace available)"}
        </pre>
    </div>
</div>

<style lang="scss">
 div {
     padding: 1rem;

     > .error-block {
         margin-top: 1rem;
     }
 }

 pre {
     font-size: 1.2rem;
     padding: 1rem 0;
     background-color: rgba(255, 0, 0, 0.2);
     &.stack {
         font-size: 1.0rem;
         color: #ccc;
         max-height: 50vh;
         overflow: auto;
         background-color: rgb(0, 0, 0, 0.2);
     }
 }
</style>
