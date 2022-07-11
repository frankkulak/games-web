<script lang="ts">
  import NavBar from "$components/navbar/NavBar.svelte";
  import HomePage from "$pages/HomePage.svelte";
</script>

<NavBar />
<main>
  <HomePage />
</main>

<style lang="scss">
  main {
    padding: 1em; // just to get sass compiled
  }
</style>
