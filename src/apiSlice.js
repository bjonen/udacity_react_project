import { createApi } from "@reduxjs/toolkit/query/react";
import { _getQuestions, _getUsers } from "./api/_DATA.js";
// Define our single API slice object
export const apiSlice = createApi({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      queryFn: () => {
        return { data: _getQuestions() };
      },
    }),
    getUsers: builder.query({
      queryFn(arg, queryApi, extraOptions, baseQuery) {
        return { data: _getUsers() };
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetQuestionsQuery } = apiSlice;
