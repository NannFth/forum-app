import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
    toggleUpvoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.upVotesBy.includes(userId)) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownvoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.downVotesBy.includes(userId)) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleNeutralizeVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      }
    },
  },
});

export const {
  receiveThreads,
  addThread,
  toggleUpvoteThread,
  toggleDownvoteThread,
  toggleNeutralizeVoteThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;