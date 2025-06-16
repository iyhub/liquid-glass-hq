<script lang="ts">
  import { useQuery } from "@sanity/svelte-loader";
  import { page } from "$app/state";
  import type { PageData } from "./$types";
  import type { Post } from "$lib/sanity/queries";
  import PostCard from "$lib/components/PostCard.svelte";
  import AppPagination from "$lib/components/AppPagination.svelte";
  import { goto } from "$app/navigation";

  const { data } = $props<{ data: PageData }>();
  let count = $state(data.count);
  let perPage = $state(data.options.pageSize);
  const q = useQuery(data);

  let posts = $state<Post[]>($q.data as Post[]);
</script>

<svelte:head>
  <title>Liquid Glass: The Next Era of Apple-Inspired UI</title>
  <meta
    name="description"
    content="A curated hub of Apple-style UI inspiration, design resources, and tools — all shaped by the Liquid Glass aesthetic."
  />
  <link rel="canonical" href="https://liquidglasshq.com/" />
  <meta
    property="og:title"
    content="Liquid Glass: The Next Era of Apple-Inspired UI"
  />
  <meta
    property="og:description"
    content="A curated hub of Apple-style UI inspiration, design resources, and tools — all shaped by the Liquid Glass aesthetic."
  />
  <meta property="og:image" content="https://liquidglasshq.com/og-image.png" />
  <meta property="og:url" content="https://liquidglasshq.com" />
  <meta property="og:type" content="website" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:title"
    content="Liquid Glass: The Next Era of Apple-Inspired UI"
  />
  <meta
    property="twitter:description"
    content="A curated hub of Apple-style UI inspiration, design resources, and tools — all shaped by the Liquid Glass aesthetic."
  />
  <meta
    property="twitter:image"
    content="https://liquidglasshq.com/og-image.png"
  />
  <meta property="twitter:url" content="https://liquidglasshq.com" />
</svelte:head>

<section class="container mx-auto text-center py-12">
  <h1 class="text-4xl font-bold">
    Liquid Glass: The Next Era of Apple-Inspired UI
  </h1>
  <p class="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
    A curated hub of Apple-style UI inspiration, design resources, and tools —
    all shaped by the Liquid Glass aesthetic.
  </p>
</section>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
  {#if posts.length}
    {#each posts as post}
      <PostCard {post} />
    {/each}
  {:else}
    <p class="col-span-full text-center text-gray-500">No posts found</p>
  {/if}
  <div class="flex justify-center mt-4">
    <AppPagination
      currentPage={Number(page.url.searchParams.get("page")) || 1}
      totalPages={Math.ceil(count / perPage)}
      onPageChange={(page) => {
        goto(`/?page=${page}&pageSize=${perPage}`);
      }}
    />
  </div>
</section>
