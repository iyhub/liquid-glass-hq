<script lang="ts">
  import { page } from "$app/state";
  import { useQuery } from "@sanity/svelte-loader";
  import type { PageData } from "./$types";
  import type { Post } from "$lib/sanity/queries";
  import { PortableText } from "@portabletext/svelte";
  import { urlFor } from "$lib/sanity/image";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { ChevronRight, Home, ExternalLink } from "lucide-svelte";

  const { data } = $props<{ data: PageData }>();
  const q = useQuery(data);
  const post = $state<Post>($q.data as Post);
</script>

<svelte:head>
  <title>{post.title} | LiquidGlassHQ.com</title>
  <meta name="description" content={post.excerpt} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
  {#if post.mainImage}
    <meta
      property="og:image"
      content={urlFor(post.mainImage).width(1200).height(630).url()}
    />
  {/if}
  <meta property="og:url" content={page.url.href} />
  <meta property="og:type" content="article" />
  <link rel="canonical" href={page.url.href} />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={post.title} />
  <meta property="twitter:site" content="@liquidglassHQ.com" />
  <meta property="twitter:description" content={post.excerpt} />
  {#if post.mainImage}
    <meta
      property="twitter:image"
      content={urlFor(post.mainImage).width(1200).height(630).url()}
    />
  {/if}
  <meta property="twitter:url" content={page.url.href} />
  <meta property="twitter:type" content="article" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
  <!-- 面包屑导航 -->
  <nav class="flex items-center space-x-2 text-sm mb-6">
    <a href="/" class="hover:text-primary flex items-center">
      <Home class="w-4 h-4" />
    </a>
    <ChevronRight class="w-4 h-4" />
    <a href="/category/{post.category.slug.current}" class="hover:text-primary">
      {post.category.title}
    </a>
    <ChevronRight class="w-4 h-4" />
    <span class="">{post.title}</span>
  </nav>

  <!-- 文章头部 -->
  <header class="mb-8">
    {#if post.mainImage}
      <div class="mb-6 rounded-lg overflow-hidden">
        <img
          src={urlFor(post.mainImage).width(1200).height(630).url()}
          alt={post.title}
          class="w-full h-auto object-cover"
        />
      </div>
    {/if}
    <div class="flex items-center gap-4 mb-4">
      <Badge variant="secondary">{post.category.title}</Badge>
      <time class="text-sm text-gray-500">
        {new Date(post._createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </div>
    <div class="flex items-center gap-2 mb-4">
      <h1 class="text-3xl font-bold">{post.title}</h1>
      <a
        href={post.url}
        target="_blank"
        class="text-sm text-muted-foreground hover:text-primary"
      >
        <ExternalLink class="w-4 h-4" />
      </a>
    </div>

    {#if post.tags}
      <div class="flex items-center gap-2 mb-4">
        {#each post.tags as tag}
          <Badge variant="outline" class="text-xs text-muted-foreground">
            {tag}
          </Badge>
        {/each}
      </div>
    {/if}

    <p class="text-lg text-gray-600 dark:text-gray-300">{post.excerpt}</p>
  </header>

  <!-- 文章内容 -->
  {#if post.body}
    <article class="prose dark:prose-invert prose-lg max-w-none">
      <PortableText components={{}} value={post.body} />
    </article>
  {/if}
</div>
