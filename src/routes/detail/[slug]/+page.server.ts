import { postQuery as query, type Post } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const { loadQuery } = event.locals;

  const initial = await loadQuery<Post[]>(query, { slug: event.params.slug });

  return {
    query,
    options: {
      initial,
    },
  };
};
