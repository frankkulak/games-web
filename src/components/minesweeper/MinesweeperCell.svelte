<script lang="ts">
  import type { MinesweeperCell } from "$lib/minesweeper";

  export let isOdd: boolean;
  export let cell: MinesweeperCell;

  $: hintText = cell.closeMines === 0 ? "" : cell.closeMines;

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    cell.dug = true;
  }

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    cell.dug = false;
  }
</script>

{#if !cell.dug}
  <div
    class="w-8 h-8 flex justify-center items-center undug-cell"
    class:is-odd={isOdd}
    on:click={handleClick}
  />
{:else}
  <div
    class="w-8 h-8 flex justify-center items-center bg-gray-300 dark:bg-gray-900"
    on:contextmenu={handleContextMenu}
  >
    {#if cell.mine}
      <div class="w-4 h-4 rounded-full bg-red-600 dark:bg-red-700" />
    {:else}
      <p class="my-0">{hintText}</p>
    {/if}
  </div>
{/if}

<style lang="scss">
  .undug-cell {
    background-color: var(--minesweeper-tile-1);

    &.is-odd {
      background-color: var(--minesweeper-tile-2);
    }
  }
</style>
