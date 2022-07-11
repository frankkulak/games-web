<script lang="ts">
  import { onMount } from "svelte";
  import { replace } from "svelte-spa-router";

  export let params: any;

  onMount(() => {
    params; // just to shut the warning up
    replace("/");
  });
</script>
