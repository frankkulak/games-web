<script lang="ts">
  import type { MinesweeperModel } from "$lib/minesweeper";
  import MinesweeperCell from "./MinesweeperCell.svelte";

  export let model: MinesweeperModel;
  let hasDug = false;
</script>

{#if model}
  <div class="bg-gray-300 dark:bg-gray-900 rounded p-1">
    {#each model.columns as column, colKey (colKey)}
      <div class="flex">
        {#each column as cell, rowKey (rowKey)}
          <MinesweeperCell
            isOdd={(colKey + rowKey) % 2 === 1}
            {cell}
            bind:model
            bind:hasDug
          />
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss" global>
  :root {
    --minesweeper-tile-1: #0abd73;
    --minesweeper-tile-2: #32c77a;

    &.dark {
      --minesweeper-tile-1: #154f37;
      --minesweeper-tile-2: #1a5c3a;
    }
  }
</style>
