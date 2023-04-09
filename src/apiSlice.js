import { createApi } from "@reduxjs/toolkit/query/react";
import { current } from "@reduxjs/toolkit";
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
    saveQuestionAnswer: build.mutation({
      queryFn(args, { signal, dispatch, getState }, extraOptions, baseQuery) {
        return _saveQuestionAnswer(args);
      },
      invalidatesTags: ["Questions", "Users"],
      // Optmistic updates https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#optimistic-updates
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResultUsers = dispatch(
          apiSlice.util.updateQueryData("getUsers", undefined, (users) => {
            users[patch.authedUser].answers[patch.qid] = patch.answer;
          })
        );

        const patchResultQuestions = dispatch(
          apiSlice.util.updateQueryData(
            "getQuestions",
            undefined,
            (questions) => {
              questions[patch.qid][patch.answer].votes.push(patch.authedUser);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultUsers.undo();
          patchResultQuestions.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetUsersQuery,
  useSaveQuestionMutation,
  useSaveQuestionAnswerMutation,
} = apiSlice;
