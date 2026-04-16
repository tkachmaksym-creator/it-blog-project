export interface Tag {
  name: string;
  slug: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt?: string;
  cover_url?: string;
  views?: number;
  published_at?: string;
  author_name?: string;
  author_slug?: string;
  category_name?: string;
  category_slug?: string;
  tags?: Tag[] | null;
}

export interface ArticleDetail extends ArticleSummary {
  id: number;
  content: string;
  meta_title?: string;
  meta_description?: string;
  updated_at?: string;
  author_bio?: string;
  author_avatar_url?: string;
}

export interface Author {
  name: string;
  slug: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  github_url?: string;
  articles_count?: number;
}
