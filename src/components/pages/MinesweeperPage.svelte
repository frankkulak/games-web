<script lang="ts">
  import MinesweeperBoard from "../minesweeper/MinesweeperBoard.svelte";
  import { MinesweeperModel } from "$lib/minesweeper";
  import { onMount } from "svelte";

  let model: MinesweeperModel = null;

  onMount(refreshModel);

  function refreshModel() {
    model = new MinesweeperModel(18, 18, 0.2);
    // if (window.innerWidth > window.innerHeight) {
    //   model = new MinesweeperModel(18, 22, 0.22);
    // } else {
    //   model = new MinesweeperModel(22, 18, 0.22);
    // }
  }

  function solveModel() {
    model.solve();
    model = model;
  }
</script>

<svelte:head>
  <title>Minesweeper</title>
</svelte:head>
<section class="flex justify-center">
  <div class="flex flex-col flex-wrap gap-4">
    {#if model}
      <div class="flex justify-center items-center gap-4 text-center">
        <p class="my-0 text-black dark:text-white">
          {model.numFlags} of {model.numMines} mines found
        </p>
        <button
          class="p-2 rounded bg-sky-500 text-white dark:text-gray-800"
          on:click={refreshModel}>Refresh</button
        >
        <button
          class="p-2 rounded bg-sky-500 text-white dark:text-gray-800"
          on:click={solveModel}>Solve</button
        >
      </div>
      <MinesweeperBoard bind:model />
    {/if}
  </div>
</section>
