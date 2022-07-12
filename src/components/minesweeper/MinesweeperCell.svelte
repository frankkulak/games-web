<script lang="ts">
  import type { MinesweeperCell, MinesweeperModel } from "$lib/minesweeper";

  export let isOdd: boolean;
  export let model: MinesweeperModel;
  export let cell: MinesweeperCell;

  let longClickTimeout: any;

  $: hintText = cell.closeMines === 0 ? "" : cell.closeMines;

  function dig(e: MouseEvent) {
    e.preventDefault();
    if (cell.flag) return;
    model.dig(cell);
    model = model;
  }

  function undig(e: MouseEvent) {
    e.preventDefault();
    if (cell.mine) cell.flag = true;
    cell.dug = false;
    model = model;
  }

  function initialDig(e: MouseEvent) {
    e.preventDefault();
    if (!model.hasDug) {
      model.initialDig(cell);
      model = model;
    }
  }

  function toggleFlag(e: MouseEvent) {
    e.preventDefault();
    cell.flag = !cell.flag;
    model = model;
  }

  function clearAdjacent(e: MouseEvent) {
    e.preventDefault();
    model.clearAdjacent(cell);
    model = model;
  }

  function startLongClick(e: MouseEvent) {
    if (longClickTimeout) clearTimeout(longClickTimeout);
    longClickTimeout = setTimeout(() => toggleFlag(e), 800);
  }

  function endLongClick() {
    clearTimeout(longClickTimeout);
  }
</script>

{#if !cell.dug}
  <div
    class="w-8 h-8 flex justify-center items-center undug-cell minesweeper-cell"
    class:is-odd={isOdd}
    on:click={initialDig}
    on:dblclick={dig}
    on:mousedown={startLongClick}
    on:mouseup={endLongClick}
    on:contextmenu={toggleFlag}
  >
    {#if cell.flag}
      <img src="./assets/flag.svg" alt="Flag" class="svg-light w-4 h-4" />
    {/if}
  </div>
{:else}
  <div
    class="w-8 h-8 flex justify-center items-center bg-gray-300 dark:bg-gray-900 dug-cell minesweeper-cell"
    class:is-odd={isOdd}
    on:contextmenu={undig}
    on:dblclick={clearAdjacent}
  >
    {#if cell.mine}
      <div class="w-4 h-4 rounded-full bg-red-600 dark:bg-red-700" />
    {:else}
      <p class="my-0 text-gray-600 dark:text-gray-300">{hintText}</p>
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

  .dug-cell {
    background-color: var(--minesweeper-dug-tile-1);

    &.is-odd {
      background-color: var(--minesweeper-dug-tile-2);
    }
  }

  .minesweeper-cell {
    user-select: none;
  }
</style>
