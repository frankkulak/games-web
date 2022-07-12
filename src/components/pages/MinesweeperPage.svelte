<script lang="ts">
  import MinesweeperBoard from "../minesweeper/MinesweeperBoard.svelte";
  import { MinesweeperModel } from "$lib/minesweeper";
  import { onMount } from "svelte";

  let model: MinesweeperModel = null;

  onMount(refreshModel);

  function refreshModel() {
    model = new MinesweeperModel(20, 20, 0.22);
  }
</script>

<svelte:head>
  <title>Minesweeper</title>
</svelte:head>
<section class="flex justify-center">
  <div class="flex flex-col gap-4">
    <MinesweeperBoard bind:model />
    <div class="flex justify-center">
      <button
        class="p-2 rounded bg-sky-500 text-white dark:text-gray-800"
        on:click={refreshModel}>Refresh</button
      >
    </div>
  </div>
</section>
