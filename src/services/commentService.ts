import { fetchWithAuth } from "../utils/apiHelper";
import { API_CONFIG } from "../config/api";

export interface Comment {
  id: number;
  recipeId: number;
  parentId: number | null;
  content: string;
  authorId: number;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt?: string;
  replies?: Comment[];
  isOwner?: boolean;
}

export interface CommentResponse {
  code: number;
  message: string;
  data: Comment[];
}

export const getRecipeComments = async (
  recipeId: number
): Promise<Comment[]> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/comments/recipes/${recipeId}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const result: CommentResponse = await response.json();
      return result.code === 200 ? result.data : [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const addComment = async (
  recipeId: number,
  content: string,
  parentId?: number
): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/comments/recipes/${recipeId}`,
      {
        method: "POST",
        body: JSON.stringify({
          content,
          parentId: parentId || null,
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.code === 200;
    }
    return false;
  } catch (error) {
    console.error("Error adding comment:", error);
    return false;
  }
};

export const updateComment = async (
  commentId: number,
  content: string
): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/comments/${commentId}`,
      {
        method: "PUT",
        body: JSON.stringify({ content }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.code === 200;
    }
    return false;
  } catch (error) {
    console.error("Error updating comment:", error);
    return false;
  }
};

export const deleteComment = async (commentId: number): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.code === 200;
    }
    return false;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
};
