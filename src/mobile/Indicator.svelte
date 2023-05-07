<script lang="ts">
 import interfaceState from "$lib/stores/interfaceState";

 export let value: any = null;
</script>

<div style="position: relative; z-index: 10;">
    <div class="indicator"
         class:top={true}
         class:bottom={false}
         class:left={!$interfaceState.pointerNearLeft || !$interfaceState.pointerNearTop}
         class:right={$interfaceState.pointerNearLeft && $interfaceState.pointerNearTop}>
        <span>
            {value}
        </span>
    </div>
</div>

<style lang="scss">
 .indicator {
     position: fixed;

     align-content: left;
     padding: 1rem;
     font-size: xxx-large;
     background: var(--neutral-300);
     color: var(--neutral-800);
     border-radius: 1rem;
     border: 0.2rem solid var(--neutral-400);
     z-index: var(--layer-top) !important;

     &.top {
         top: calc(1rem + var(--f7-navbar-height) + var(--f7-safe-area-top));
     }
     &.bottom {
         bottom: 5rem
     }
     &.left {
         left: 1rem;
     }
     &.right {
         right: 1rem;
     }
 }
</style>
