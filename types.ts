
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  // New structured fields for SEO and UX
  stats?: {
    funding: string;
    level: string;
    deadline: string;
    location: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}
