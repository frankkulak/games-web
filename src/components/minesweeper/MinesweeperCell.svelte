<script lang="ts">
  import type { MinesweeperCell, MinesweeperModel } from "$lib/minesweeper";

  export let isOdd: boolean;
  export let model: MinesweeperModel;
  export let cell: MinesweeperCell;

  let longClickTimeout: any;
  let showFloatingFlag = false;

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

  function toggleFlag(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    cell.flag = !cell.flag;
    model = model;
  }

  function clearAdjacent(e: MouseEvent) {
    e.preventDefault();
    model.clearAdjacent(cell);
    model = model;
  }

  function startLongClick(e: MouseEvent | TouchEvent) {
    showFloatingFlag = true;
    if (longClickTimeout) clearTimeout(longClickTimeout);
    longClickTimeout = setTimeout(() => toggleFlag(e), 500);
  }

  function endLongClick() {
    showFloatingFlag = false;
    clearTimeout(longClickTimeout);
  }
</script>

{#if !cell.dug}
  <div
    class="w-9 h-9 flex justify-center items-center undug-cell minesweeper-cell relative"
    class:is-odd={isOdd}
    on:click={initialDig}
    on:dblclick={dig}
    on:touchstart={startLongClick}
    on:mousedown={startLongClick}
    on:touchend={endLongClick}
    on:mouseup={endLongClick}
    on:contextmenu={toggleFlag}
  >
    {#if cell.flag}
      <img src="./assets/flag.svg" alt="Flag" class="svg-light w-4 h-4" />
    {/if}
    {#if showFloatingFlag}
      <div
        class="absolute bottom-6 p-2 bg-sky-500 rounded-full shadow-sm"
        on:mouseup={toggleFlag}
        on:touchend={toggleFlag}
      >
        <img src="./assets/flag.svg" alt="Flag" class="svg-light w-4 h-4" />
      </div>
    {/if}
  </div>
{:else}
  <div
    class="w-9 h-9 flex justify-center items-center bg-gray-300 dark:bg-gray-900 dug-cell minesweeper-cell"
    class:is-odd={isOdd}
    on:contextmenu={undig}
    on:dblclick={clearAdjacent}
  >
    {#if cell.mine}
      <div class="w-4 h-4 rounded-full bg-red-600 dark:bg-red-700" />
    {:else}
      <p
        class="my-0 text-gray-600 dark:text-gray-300 font-bold"
        style="color: var(--minesweeper-count-{cell.closeMines});"
      >
        {hintText}
      </p>
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

  .minesweeper-cell,
  img,
  p {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
