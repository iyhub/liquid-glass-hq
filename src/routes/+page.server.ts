import { postsQuery as query, type Post } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";
import { postsCountQuery } from "$lib/sanity/queries";

export const load: PageServerLoad = async (event) => {
  const { loadQuery } = event.locals;

  // 获取分页参数
  const page = Number(event.url.searchParams.get("page")) || 1;
  const pageSize = Number(event.url.searchParams.get("pageSize")) || 10;

  // 计算分页的起始和结束位置
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const initial = await loadQuery<Post[]>(query, { start, end });
  const totalCount = await loadQuery<number>(postsCountQuery);
  const count = Number(totalCount);

  return {
    query,
    count,
    options: {
      initial,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
  };
};
