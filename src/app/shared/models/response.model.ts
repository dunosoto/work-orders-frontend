export interface Response<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface Paginator<T> {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
  first: string;
  last: string;
  prev: string;
  next: string;
}
