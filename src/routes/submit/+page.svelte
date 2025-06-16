<script lang="ts">
  import { page } from "$app/state";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Send } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { ActionResult } from "@sveltejs/kit";
  let actionResult = $state<ActionResult>();
  let error = $derived(
    actionResult?.type === "failure"
      ? (actionResult.data as { error: string })?.error
      : null
  );
</script>

<svelte:head>
  <title>Submit New Things | LiquidGlassHQ.com</title>
  <meta
    name="description"
    content="Submit New Things About Liquid Glass to LiquidGlassHQ.com"
  />
  <meta name="author" content="LiquidGlassHQ.com" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={page.url.href} />
</svelte:head>

<div class="container mx-auto max-w-2xl px-4 py-8 md:py-16">
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold tracking-tight">Submit New Things</h1>
      <p class="mt-2 text-sm text-muted-foreground">
        Share your Liquid Glass thing.
      </p>
    </div>

    <form
      method="post"
      use:enhance={(formData) => {
        console.log("formData", formData);
        return async ({ result, update }) => {
          console.log("result", result);
          actionResult = result;
        };
      }}
      class="space-y-4 bg-card p-6 rounded-lg shadow-sm border"
    >
      <div class="space-y-2">
        <label for="url" class="text-sm font-medium">URL</label>
        <Input
          id="url"
          type="url"
          name="url"
          placeholder="https://example.com"
          class="w-full"
        />
      </div>

      <div class="space-y-2">
        <label for="excerpt" class="text-sm font-medium">Excerpt</label>
        <Textarea
          id="excerpt"
          name="excerpt"
          placeholder="Share your In..."
          class="w-full min-h-[120px]"
        />
      </div>

      <div class="pt-2">
        <Button type="submit" class="w-full">
          <Send class="w-4 h-4" />
          <span>Submit</span>
        </Button>
      </div>
      <div class="pt-2">
        <p class="text-sm text-red-500">{error}</p>
      </div>
    </form>
  </div>
</div>
