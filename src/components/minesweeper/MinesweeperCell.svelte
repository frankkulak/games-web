<script lang="ts">
  import type { MinesweeperCell, MinesweeperModel } from "$lib/minesweeper";

  export let isOdd: boolean;
  export let model: MinesweeperModel;
  export let cell: MinesweeperCell;

  $: hintText = cell.closeMines === 0 ? "" : cell.closeMines;

  function dig(e: MouseEvent) {
    e.preventDefault();
    model.dig(cell);
    model = model;
  }

  function undig(e: MouseEvent) {
    e.preventDefault();
    cell.dug = false;
  }

  function toggleFlag(e: MouseEvent) {
    e.preventDefault();
    cell.flag = !cell.flag;
  }
</script>

{#if !cell.dug}
  <div
    class="w-8 h-8 flex justify-center items-center undug-cell"
    class:is-odd={isOdd}
    on:click={dig}
    on:contextmenu={toggleFlag}
  >
    {#if cell.flag}
      <img src="./assets/flag.svg" alt="Flag" class="svg-light w-4 h-4" />
    {/if}
  </div>
{:else}
  <div
    class="w-8 h-8 flex justify-center items-center bg-gray-300 dark:bg-gray-900"
    on:contextmenu={undig}
  >
    {#if cell.mine}
      <div class="w-4 h-4 rounded-full bg-red-600 dark:bg-red-700" />
    {:else}
      <p class="my-0 text-gray-500 dark:text-gray-300">{hintText}</p>
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
