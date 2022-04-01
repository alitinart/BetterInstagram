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
  }
}

export const userRequests = {};
export const postRequests = {};
