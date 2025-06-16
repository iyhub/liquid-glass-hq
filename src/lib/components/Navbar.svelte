<script lang="ts">
  import { open } from "$lib/store/sidebar.js";
  import ModelToggle from "./ModelToggle.svelte";
  import { Menu, Send } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";

  let status = $state();
  open.subscribe((value) => {
    status = value;
  });
</script>

<div
  class="fixed top-0 left-0 w-full bg-secondary flex justify-between items-center h-16 p-4 border-b"
>
  <div class="flex items-center gap-4">
    <Button variant="outline" class="border" onclick={() => open.set(!status)}>
      <Menu />
    </Button>
    <a href="/" class="text-2xl font-bold">Liquid Glass HQ</a>
  </div>
  <div class="flex gap-4 items-center">
    <Button href="/submit">
      <Send class="w-4 h-4" />
      <span>Submit</span>
    </Button>
    <ModelToggle />
  </div>
</div>
