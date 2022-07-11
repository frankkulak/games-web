<script lang="ts">
  import type { MinesweeperCell } from "$lib/minesweeper";

  export let isOdd: boolean;
  export let cell: MinesweeperCell;

  $: hintText = cell.closeMines === 0 ? "" : cell.closeMines;
</script>

{#if !cell.dug}
  <div
    class="w-8 h-8 flex justify-center items-center"
    class:bg-emerald-800={!isOdd}
    class:bg-emerald-700={isOdd}
  />
{:else}
  <div class="w-8 h-8 flex justify-center items-center bg-gray-900">
    {#if cell.mine}
      <div class="w-4 h-4 rounded-full bg-red-700" />
    {:else}
      <p class="my-0">{hintText}</p>
    {/if}
  </div>
{/if}
