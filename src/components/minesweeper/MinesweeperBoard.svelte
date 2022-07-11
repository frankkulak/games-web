<script lang="ts">
  import type { MinesweeperModel } from "$lib/minesweeper";
  import MinesweeperCell from "./MinesweeperCell.svelte";

  export let model: MinesweeperModel;
</script>

{#if model}
  <div>
    {#each model.columns as column, colKey (colKey)}
      <div class="flex">
        {#each column as cell, rowKey (rowKey)}
          <MinesweeperCell isOdd={(colKey + rowKey) % 2 === 1} {cell} />
        {/each}
      </div>
    {/each}
  </div>
{/if}
