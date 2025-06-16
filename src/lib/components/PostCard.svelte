<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Image } from "@unpic/svelte";
  import { urlFor } from "$lib/sanity/image";
  import type { Post } from "$lib/sanity/queries";
  import { ArrowRightIcon } from "lucide-svelte";
  import Button from "./ui/button/button.svelte";

  const { post } = $props<{ post: Post }>();
</script>

<article
  class="bg-card border h-fit rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:ring-2 hover:ring-primary"
>
  {#if post.mainImage}
    <div class="h-full">
      <a href={`/detail/${post.slug.current}`}>
        <Image
          src={urlFor(post.mainImage).width(900).height(600).url()}
          layout="constrained"
          class="w-full h-full object-cover"
          alt={post.title || "Blog post image"}
        />
      </a>
    </div>
  {/if}
  <div class="bg-secondary p-4 pt-2 flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">{post.title}</h2>
      <Button
        href={`/detail/${post.slug.current}`}
        variant="ghost"
        class="w-fit px-1 group"
      >
        <ArrowRightIcon
          class="w-4 h-4 group-hover:translate-x-1 transition-all duration-200"
        />
      </Button>
    </div>
    {#if post.tags}
      <div class="flex items-center gap-1 mb-1">
        <a
          href={`/category/${post.category.slug.current}`}
          class="w-fit self-end"
        >
          <Badge class="leading-relaxed">#{post.category.title}</Badge>
        </a>
        {#each post.tags as tag}
          <Badge
            variant="outline"
            class="text-muted-foreground leading-relaxed"
          >
            {tag}
          </Badge>
        {/each}
      </div>
    {/if}
    <p class="text-sm leading-relaxed line-clamp-3">
      {post.excerpt}
    </p>
  </div>
</article>
