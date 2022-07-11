<script lang="ts">
  import ThemeButton from "./ThemeButton.svelte";
</script>

<nav class="bg-gray-300 dark:bg-gray-900 shadow-md flex justify-between p-3">
  <a href="/">
    <h3 class="gradient-text font-bold">Tiny Games</h3>
  </a>
  <div class="flex gap-4">
    <ThemeButton />
  </div>
</nav>
