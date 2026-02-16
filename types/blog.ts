export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  cover?: string;
};

export type BlogPost = {
  meta: BlogPostMeta;
  content: string;
};
