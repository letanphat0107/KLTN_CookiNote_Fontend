// src/services/postService.ts
import { API_CONFIG, buildApiUrl } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string | null;
  authorId: number;
  authorName: string;
  authorAvatarUrl: string;
  role: string;
}

export interface PostsResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: Post[];
}

export const getPosts = async (
  page: number = 0,
  size: number = 10
): Promise<PostsResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetchWithAuth(
      `${buildApiUrl("/cookinote/posts")}?${params}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostDetail = async (postId: number): Promise<Post> => {
  try {
    const response = await fetchWithAuth(
      buildApiUrl(`/cookinote/posts/${postId}`),
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post detail");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching post detail:", error);
    throw error;
  }
};
