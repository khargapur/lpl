export interface LabTest {
  id: string;
  test_code: string;
  test_name: string;
  slug: string;
  components: string;
  specimen: string;
  method: string;
  comments: string;
  report: string;
  aliases: string[];
  category: string;
  price?: number | null;
  search_vector?: unknown;
  created_at?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  read_time: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface BlogPostInsert {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  read_time: string;
  status: "draft" | "published";
  published_at: string | null;
}

export interface BlogPostUpdate {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  image_url?: string;
  read_time?: string;
  status?: "draft" | "published";
  published_at?: string | null;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      lab_tests: {
        Row: LabTest;
        Insert: Omit<LabTest, "id" | "search_vector" | "created_at">;
        Update: Partial<Omit<LabTest, "id" | "search_vector">>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: BlogPostInsert;
        Update: Partial<BlogPostInsert>;
      };
    };
  };
}
