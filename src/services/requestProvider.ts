/**
 *
 * TODO: Add Requests for adding Posts, following users and adding stories
 *
 * ? Add calling, livestreaming etc...
 *
 */

import axios, { AxiosRequestHeaders } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY: any = process.env.REACT_APP_API_KEY;

const defaultHeader: AxiosRequestHeaders = {
  "x-api-key": API_KEY,
};

async function request(
  pathname: string,
  method: string,
  body: any,
  headers: AxiosRequestHeaders
) {
  switch (method) {
    case "GET":
      const getResponse = await axios.get(`${API_URL}${pathname}`, {
        headers: {
          ...defaultHeader,
          ...headers,
        },
      });

      return getResponse.data;
    case "POST":
      const postResponse = await axios.post(
        `${API_URL}${pathname}`,
        { ...body },
        { headers: { ...defaultHeader, ...headers } }
      );

      return postResponse.data;
    case "PATCH":
      const patchResponse = await axios.patch(
        `${API_URL}${pathname}`,
        { ...body },
        { headers: { ...defaultHeader, ...headers } }
      );

      return patchResponse.data;
    case "DELETE":
      const deleteResponse = await axios.delete(`${API_URL}${pathname}`, {
        headers: { ...defaultHeader, ...headers },
      });

      return deleteResponse.data;
    case "FORM-DATA":
      const formResponse = await axios.post(`${API_URL}${pathname}`, body, {
        headers: { ...defaultHeader, ...headers },
      });

      return formResponse.data;
  }
}

export const userRequests = {
  /**
   * Get User By Id
   * @param id
   * @returns User Object
   */
  getUserById: async (id: string) => {
    return await request(`/api/v2/general/users/${id}`, "GET", {}, {});
  },
  /**
   * Change Profile Image
   * @param token
   * @param data
   * @returns
   */
  changeProfileImage: async (token: string, data: FormData) => {
    return await request(
      "/api/v2/general/users/change/pfp",
      "FORM-DATA",
      data,
      { Authorization: `Bearer ${token}` }
    );
  },
  /**
   * Search Users
   * @returns Users
   * @param query
   */
  searchUser: async (query: string | undefined) => {
    return await request(
      `/api/v2/general/users/search/${query}`,
      "GET",
      {},
      {}
    );
  },
  /**
   * Sync User
   * @return User Object
   */
  syncUser: async (token: string | null) => {
    return await request(
      "/api/v2/general/users/sync",
      "GET",
      {},
      { Authorization: `Bearer ${token}` }
    );
  },
  /**
   * Get Users
   * @returns All Users
   */
  getAllUsers: async () => {
    return await request("/api/v2/general/users", "GET", {}, {});
  },
  /**
   * Register User
   */
  registerUser: async (
    email: string,
    name: string,
    lastName: string,
    username: string,
    password: string
  ) => {
    return await request(
      "/api/v2/general/users/auth/register",
      "POST",
      { email, name, lastName, username, password },
      {}
    );
  },
  /**
   * Login User
   * @returns Token and User Object
   */
  loginUser: async (username: string, password: string) => {
    return await request(
      "/api/v2/general/users/auth/login",
      "POST",
      {
        email: undefined,
        username,
        password,
      },
      {}
    );
  },
};

export const postRequests = {
  /**
   * Create Post
   * @param token
   * @param data
   * @returns Message
   */
  createPost: async (token: string, data: FormData) => {
    return await request("/api/v2/general/posts/", "FORM-DATA", data, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });
  },
  /**
   * Get Post By ID
   * @param id
   * @returns Post
   */
  getPostById: async (id: string) => {
    return await request(`/api/v2/general/posts/${id}`, "GET", {}, {});
  },
};
