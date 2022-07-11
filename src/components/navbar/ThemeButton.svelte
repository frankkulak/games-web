<script lang="ts">
  import { onDestroy } from "svelte";
  import { Settings } from "../../lib/storage";
  import { isLightThemeStore } from "../../lib/stores";

  let isLightTheme = Settings.isLightTheme;
  const unsubscribe = isLightThemeStore.subscribe((value) => {
    isLightTheme = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  $: src = `./assets/${isLightTheme ? "sunny" : "moon"}-outline.svg`;
  $: alt = isLightTheme ? "Light" : "Dark";

  function toggleTheme() {
    isLightTheme = !isLightTheme;
    document.documentElement.classList.add("theme-transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 500); // keep in sync with theme-transition class in base.scss
    isLightThemeStore.set(isLightTheme);
  }
</script>

<button on:click={toggleTheme}>
  <img {src} {alt} class="h-5 w-auto svg" />
</button>

<style lang="scss">
  // intentionally blank
</style>
