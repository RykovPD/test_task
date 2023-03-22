import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./authSlice";
import { IUser } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    auth: build.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "login",
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "register",
          method: "POST",
          body,
        };
      },
    }),
    fetchUser: build.query<IUser, void>({
      query: () => `about`,
    }),
  }),
});

export const { useAuthMutation, useRegisterMutation, useFetchUserQuery } =
  authApi;
