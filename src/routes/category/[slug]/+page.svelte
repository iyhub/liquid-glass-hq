<script lang="ts">
  import { page } from "$app/state";
  import { useQuery } from "@sanity/svelte-loader";
  import type { PageData } from "./$types";
  import type { Post } from "$lib/sanity/queries";
  import PostCard from "$lib/components/PostCard.svelte";
  import AppPagination from "$lib/components/AppPagination.svelte";
  import { goto } from "$app/navigation";
  import { Home, ChevronRight } from "lucide-svelte";

  const { data } = $props<{ data: PageData }>();
  let currentSlug = $state(page.params.slug);
  let count = $state(data.options.totalCount.data);
  let perPage = $state(data.options.pageSize);
  let currentPage = $derived(Number(page.url.searchParams.get("page")) || 1);

  let q = $derived(
    useQuery(data, {
      params: { 
        start: (currentPage - 1) * perPage, 
        end: currentPage * perPage,
        slug: currentSlug
      }
    })
  );
  let category = $derived(data.options.category.data);

  let posts = $derived($q.data as Post[]);
</script>

<svelte:head>
  <title>{category?.title} | LiquidGlassHQ.com</title>
  <meta name="description" content={category?.excerpt} />
  <link
    rel="canonical"
    href={`https://liquidglasshq.com/category/${currentSlug}`}
  />
</svelte:head>

<div class="container mx-auto">
  <!-- 面包屑导航 -->
  <nav class="flex items-center space-x-2 text-sm mb-6">
    <a href="/" class="hover:text-primary flex items-center">
      <Home class="w-4 h-4" />
    </a>
    <ChevronRight class="w-4 h-4" />
    <span class="">{category?.title}</span>
  </nav>
  <section class="flex flex-col gap-4 pb-12">
    <h1 class="text-2xl font-bold">{category?.excerpt}</h1>
  </section>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each posts as post}
      <PostCard {post} />
    {/each}
  </div>
  <div class="flex justify-center mt-4">
    <AppPagination
      currentPage={Number(page.url.searchParams.get("page")) || 1}
      totalPages={Math.ceil(count / perPage)}
      onPageChange={(page) => {
        goto(`/category/${currentSlug}?page=${page}&pageSize=${perPage}`);
      }}
    />
  </div>
</div>
