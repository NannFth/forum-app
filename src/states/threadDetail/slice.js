import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      if (state) {
        state.comments.unshift(action.payload);
      }
    },
    toggleUpvoteThreadDetail: (state, action) => {
      const { userId } = action.payload;
      if (state) {
        if (state.upVotesBy.includes(userId)) {
          state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        } else {
          state.upVotesBy.push(userId);
          state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownvoteThreadDetail: (state, action) => {
      const { userId } = action.payload;
      if (state) {
        if (state.downVotesBy.includes(userId)) {
          state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
        } else {
          state.downVotesBy.push(userId);
          state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleNeutralizeVoteThreadDetail: (state, action) => {
      const { userId } = action.payload;
      if (state) {
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      }
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpvoteThreadDetail,
  toggleDownvoteThreadDetail,
  toggleNeutralizeVoteThreadDetail,
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;