<script lang="ts">
  import MinesweeperBoard from "../minesweeper/MinesweeperBoard.svelte";
  import { MinesweeperModel } from "$lib/minesweeper";
  import { onMount } from "svelte";

  let model: MinesweeperModel = null;

  onMount(() => {
    model = new MinesweeperModel(20, 20, 0.2);
  });
</script>

<svelte:head>
  <title>Minesweeper</title>
</svelte:head>
<section class="flex justify-center">
  <MinesweeperBoard bind:model />
</section>
