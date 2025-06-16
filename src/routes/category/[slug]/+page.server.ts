import {
  postsByCategoryQuery as query,
  type Post,
  categoryQuery,
} from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";
import { postsCountByCategoryQuery as countQuery } from "$lib/sanity/queries";

export const load: PageServerLoad = async (event) => {
  const slug = event.params.slug;

  const { loadQuery } = event.locals;

  // 首先检查分类是否存在
  const category = await loadQuery(categoryQuery, { slug });
  if (!category) {
    return {
      status: 404,
      error: new Error(`Category with slug "${slug}" not found`),
    };
  }

  // 获取分页参数
  const page = Number(event.url.searchParams.get("page")) || 1;
  const pageSize = Number(event.url.searchParams.get("pageSize")) || 10;

  // 计算分页的起始和结束位置
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const initial = await loadQuery<Post[]>(query, { start, end, slug });
  const totalCount = await loadQuery<number>(countQuery, { slug });
  const count = Number(totalCount);

  return {
    query,
    count,
    category,
    options: {
      initial,
      page,
      pageSize,
      totalCount,
      category,
      totalPages: Math.ceil(count / pageSize),
    },
  };
};
