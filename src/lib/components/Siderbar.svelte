<script lang="ts">
  import { open } from "$lib/store/sidebar.js";
  import { fly, slide, scale } from "svelte/transition";
  import { X, ChevronRight } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";

  let status = $state();
  open.subscribe((value) => {
    status = value;
  });

  const links = [
    { href: "/category/website", label: "WebSite" },
    { href: "/category/app", label: "App" },
    { href: "/category/articles", label: "Articles" },
    { href: "/category/resources", label: "Resources" },
  ];
</script>

{#if status}
  <nav
    class="bg-secondary w-[280px] h-screen fixed top-16 left-0 border-r flex flex-col gap-4 z-10"
    in:slide={{ duration: 800, axis: "x" }}
    out:fly={{ duration: 500, x: -280 }}
  >
    <Button
      onclick={() => open.update((n) => false)}
      size="icon"
      variant="ghost"
      class="absolute top-2 right-2"
    >
      <X />
    </Button>
    <div class="flex flex-col gap-4 py-12 items-center px-4 w-full">
      <h2 class="text-2xl font-bold">Categories</h2>
      <Button
        variant="outline"
        class="w-full group flex justify-between text-lg rounded-md text-center px-8"
        href="/"
        onclick={() => open.set(false)}
      >
        <span> Home </span>
        <ChevronRight class="group-hover:translate-x-2 transition-all" />
      </Button>
      {#each links as link}
        <Button
          variant="outline"
          class="w-full group flex justify-between text-lg rounded-md text-center px-8"
          href={link.href}
          onclick={() => open.set(false)}
        >
          <span>
            {link.label}
          </span>
          <ChevronRight class="group-hover:translate-x-2 transition-all" />
        </Button>
      {/each}
    </div>
  </nav>
{/if}
