import { MetaProps } from "./common";

export interface NewsData {
  id?: string;
  title?: string | null;
  cover_image?: string | null;
  status?: number;
  scope?: string;
  created_at?: string | null;
  published_at?: string | null;
  scheduled_at?: string | null;
  distance_time?: string | null;  // NOW - updated_at
  go_live?: string | null;       // scheduled_at - NOW
  author?: {                      // chỉ có ở API Get /news không có ở API Get /news/:id
    id?: string;
    name?: string | null;
    avatar?: string | null;
  };
  reactions?: {
    type?: number;
    count?: number;
  }[];
  views?: number;

  // news detail
  content?: string | null;
  created_by?: {
    id?: string;
    name?: string | null;
    avatar?: string | null;
  };
  updated_by?: {
    id?: string;
    name?: string | null;
    avatar?: string | null;
  };
  updated_at?: string | null;
  files?: {
    attachment_id?: string;
    url?: string | null;
    metadata?: {
      name?: string | null;
      attachment_type?: number;
      content_type?: string | null;
      size?: string | null;
      author_id?: string | null;
      author_type?: string | null;
    };
  }[];
  comments?: {
    id?: string;
    text?: string | null;
    img?: string[] | null;
    created_at?: string | null;
    updated_at?: string | null;
    resident?: {
      id?: string;
      name?: string | null;
      avatar?: string | null;
      anonymous?: boolean;
    };
  }[];
}

export interface NewsDetailResponse {
  data: NewsData;
}

export interface NewsListResponse {
  meta: MetaProps;
  data: NewsData[];
}

export interface NewsParam extends MetaProps {
  search?: string | null; // by title
  status?: number;
  created_from?: string | null;
  created_to?: string | null;
}


export interface NewsReactionProps {
  reactions?: NewsData["reactions"];
  views?: number | string | null;
  size?: number;      // icon size (default 18)
  viewColor?: string; // color for views text/icon
}

export interface NewsPayload {    // dùng ching cho create và update news
  title?: string;
  content?: string;
  status?: number; // 0=draft, 1=published, 2-  3=scheduled, ...
  scheduled_at?: string | null;
  cover_image?: File | null;
  files?: File[];
  remove_cover_image?: boolean;
  remove_all_files?: boolean;
}

export interface NewsFormProps {
  initialData?: NewsData;         // dữ liệu khi update
  onSubmit: (data: NewsPayload) => void;
  submitting?: boolean;
  onCancel: () => void;
}