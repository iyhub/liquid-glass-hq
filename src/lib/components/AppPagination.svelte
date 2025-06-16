<script lang="ts">
  let {
    currentPage = 1,
    totalPages = 0,
    onPageChange,
  } = $props<{
    currentPage?: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
  }>();

  // 使用 $state 声明响应式状态
  let page = $state(currentPage ?? 1);
  let total = $state(totalPages ?? 1);

  // 使用 $derived 计算要显示的页码按钮
  const pages = $derived(Array.from({ length: total }, (_, i) => i + 1));
  const visiblePages = $derived(
    pages.filter((p) => {
      // 始终显示第一页和最后一页
      if (p === 1 || p === total) return true;
      // 显示当前页附近的页码
      if (Math.abs(p - page) <= 1) return true;
      return false;
    })
  );

  // 处理页码点击
  function handlePageClick(newPage: number) {
    if (newPage !== page) {
      page = newPage;
      onPageChange(newPage);
    }
  }

  // 处理上一页
  function handlePrevPage() {
    if (page > 1) {
      page--;
      onPageChange(page);
    }
  }

  // 处理下一页
  function handleNextPage() {
    if (page < total) {
      page++;
      onPageChange(page);
    }
  }
</script>

{#if totalPages > 1}
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center justify-center space-x-2 py-4">
      <!-- 上一页按钮 -->
      <button
        onclick={handlePrevPage}
        disabled={page === 1}
        class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
           {page === 1
          ? 'bg-muted text-muted-foreground cursor-not-allowed'
          : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border border-border'} transition-colors duration-200"
        aria-label="Previous Page"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- 页码按钮 -->
      {#each visiblePages as p, i}
        {#if i > 0 && p - visiblePages[i - 1] > 1}
          <span class="px-2 text-gray-500">...</span>
        {/if}
        <button
          onclick={() => handlePageClick(p)}
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
             {p === page
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border border-border'} transition-colors duration-200"
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      {/each}

      <!-- 下一页按钮 -->
      <button
        onclick={handleNextPage}
        disabled={page === total}
        class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
           {page === total
          ? 'bg-muted text-muted-foreground cursor-not-allowed'
          : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border border-border'} transition-colors duration-200"
        aria-label="Next Page"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- 页码信息 -->
    <div class="text-center text-sm text-muted-foreground mt-2">
      Page {page} of {total}
    </div>
  </div>
{/if}
