import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// 공용 API 인스턴스 (토큰이 필요 없는 경우)
const publicAPI = axios.create({
  baseURL: BASE_URL,
});

// 인증 API 인스턴스 (토큰이 필요한 경우)
const privateAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// accessToken을 자동으로 Authorization 헤더에 삽입
privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * API 서비스 객체
 * 실제 API 호출을 위한 메서드들을 제공
 * public과 private으로 구분하여 각각의 용도에 맞는 메서드 제공
 */
export const APIService = {
  // 공용 API 메서드 (토큰 불필요)
  public: {
    get: async (url, config = {}) => {
      const response = await publicAPI.get(url, config);
      return response.data;
    },
    post: async (url, data = {}, config = {}) => {
      const response = await publicAPI.post(url, data, config);
      return response;
    },
  },

  // 인증 API 메서드 (토큰 필요)
  private: {
    get: async (url, config = {}) => {
      const response = await privateAPI.get(url, config);
      return response.data;
    },
    post: async (url, data = {}, config = {}) => {
      const response = await privateAPI.post(url, data, config);
      return response.data;
    },
    put: async (url, data = {}, config = {}) => {
      const response = await privateAPI.put(url, data, config);
      return response.data;
    },
    delete: async (url, config = {}) => {
      const response = await privateAPI.delete(url, config);
      return response.data;
    },
    patch: async (url, data = {}, config = {}) => {
      const response = await privateAPI.patch(url, data, config);
      return response.data;
    },
  },
};

export { publicAPI, privateAPI };