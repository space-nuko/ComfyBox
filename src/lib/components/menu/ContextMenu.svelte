<script>
 import Menu from './Menu.svelte';
 import MenuOption from './MenuOption.svelte';
 import MenuDivider from './MenuDivider.svelte';
 import { tick } from 'svelte'

 import Icon from './Icon.svelte'

 let pos = { x: 0, y: 0 };
 let showMenu = false;

 async function onRightClick(e) {
     if (showMenu) {
         showMenu = false;
         await new Promise(res => setTimeout(res, 100));
     }

     pos = { x: e.clientX, y: e.clientY };
     showMenu = true;
 }

 function closeMenu() {
     showMenu = false;
 }
</script>

{#if showMenu}
    <Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
        <MenuOption
            on:click={console.log}
                     text="Do nothing" />
        <MenuOption
            on:click={console.log}
                     text="Do nothing, but twice" />
        <MenuDivider />
        <MenuOption
            isDisabled={true}
                       on:click={console.log}
                       text="Whoops, disabled!" />
        <MenuOption on:click={console.log}>
            <Icon />
            <span>Look! An icon!</span>
        </MenuOption>
    </Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />
