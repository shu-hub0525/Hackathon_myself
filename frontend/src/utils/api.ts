import axios from "axios";

// APIのベースURL
export const API_BASE_URL = "https://dogenkotu.onrender.com";

// axiosのインスタンスを作成
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// エラーハンドリング用のユーティリティ
export const handleApiError = (error: any): string => {
  if (error.response) {
    return error.response.data?.detail || "サーバーエラーが発生しました";
  } else if (error.request) {
    return "ネットワークエラーが発生しました";
  } else {
    return "予期しないエラーが発生しました";
  }
};
