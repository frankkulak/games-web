<script lang="ts">
  import type { MinesweeperModel } from "$lib/minesweeper";
  import MinesweeperCell from "./MinesweeperCell.svelte";

  export let model: MinesweeperModel;
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
    --minesweeper-dug-tile-1: #dce3e1;
    --minesweeper-dug-tile-2: #ebeeed;
    --minesweeper-count-1: #089fc5;
    --minesweeper-count-2: #3db24b;
    --minesweeper-count-3: #c4c42e;
    --minesweeper-count-4: #c78932;
    --minesweeper-count-5: #c75c32;
    --minesweeper-count-6: #c73c32;
    --minesweeper-count-7: #c732ae;
    --minesweeper-count-8: #7f32c7;

    &.dark {
      --minesweeper-tile-1: rgb(15, 83, 49);
      --minesweeper-tile-2: #1a5c3a;
      --minesweeper-dug-tile-1: #2f3440;
      --minesweeper-dug-tile-2: #282d38;
    }
  }
</style>
