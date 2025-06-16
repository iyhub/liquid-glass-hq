export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
  };
  excerpt?: string;
  publishedAt: string;
  body: any; // 可以根据实际需求定义更详细的类型
}
