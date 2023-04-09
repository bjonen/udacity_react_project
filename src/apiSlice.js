import { createApi } from "@reduxjs/toolkit/query/react";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./api/_DATA.js";
// Define our single API slice object
export const apiSlice = createApi({
  tagTypes: ["Questions", "Users"],
  endpoints: (build) => ({
    getQuestions: build.query({
      queryFn: () => {
        return { data: _getQuestions() };
      },
      providesTags: ["Questions"],
    }),
    getUsers: build.query({
      queryFn(arg, queryApi, extraOptions, baseQuery) {
        return { data: _getUsers() };
      },
      providesTags: ["Users"],
    }),
    // https://redux-toolkit.js.org/rtk-query/usage/mutations#defining-mutation-endpoints
    saveQuestion: build.mutation({
      queryFn(args, { signal, dispatch, getState }, extraOptions, baseQuery) {
        return _saveQuestion(args);
      },
      invalidatesTags: ["Questions", "Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetQuestionsQuery,
  useSaveQuestionMutation,
} = apiSlice;
