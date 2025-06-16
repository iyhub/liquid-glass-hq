import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  category->{
    title,
    slug
  }
}`;

// const gamesInCategory: Game[] = await sanityClient.fetch(
//   `*[_type == "game" && references(*[_type == "category" && slug.current == $slug]._id)]{
//     _id,
//     title,
//     slug,
//     mainImage,
//     excerpt,
//     releaseDate
//   } | order(publishedAt desc) [${skip}...${skip + gamesPerPage}]`,
//   { slug }
// );

// list by category
export const postsByCategoryQuery = groq`*[_type == "post" && defined(slug.current) && references(*[_type == "category" && slug.current == $slug]._id)] | order(_createdAt desc) [$start...$end] {
  ...,
  category->{
    title,
    slug
  }
}`;

// count by category
export const postsCountByCategoryQuery = groq`count(*[_type == "post" && defined(slug.current) && references(*[_type == "category" && slug.current == $slug]._id)])`;

// 增加分页查询
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [$start...$end] {
  ...,
  category->{
    title,
    slug
  }
}`;

export const postsSitemapQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

// 获取文章总数
export const postsCountQuery = groq`count(*[_type == "post" && defined(slug.current)])`;

// 检查分类是否存在
export const categoryQuery = groq`*[_type == "category" && slug.current == $slug][0]`;

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  url?: string;
  assertUrl?: string;
  slug: Slug;
  excerpt?: string;
  tags?: string[];
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
  category: Category;
}

export interface Category {
  _type: "category";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
}
