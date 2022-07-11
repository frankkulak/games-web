<script lang="ts">
  import Router from "svelte-spa-router";
  import NavBar from "$components/navbar/NavBar.svelte";
  import HomePage from "$pages/HomePage.svelte";
  import MinesweeperPage from "$pages/MinesweeperPage.svelte";
  import NotFoundPage from "$pages/NotFoundPage.svelte";

  const routes = {
    "/": HomePage,
    "/minesweeper": MinesweeperPage,
    "*": NotFoundPage,
  };
</script>

<NavBar />
<main>
  <Router {routes} />
</main>

<style lang="scss">
  main {
    padding: 1em; // just to get sass compiled
  }
</style>
