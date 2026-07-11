import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from './ThreadItem';

const mockStore = configureStore({
  reducer: {
    authUser: (state = { id: 'user-99', name: 'Preview User' }) => state,
  },
});

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

const baseArgs = {
  id: 'thread-1',
  title: 'Bagaimana cara belajar React yang efektif?',
  body: '<p>Aku baru mulai belajar React, ada saran resource yang bagus?</p>',
  category: 'Belajar',
  createdAt: new Date().toISOString(),
  totalComments: 3,
  user: {
    id: 'user-1',
    name: 'Budi Santoso',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso',
  },
  upVotesBy: [],
  downVotesBy: [],
};

export const NoVotes = {
  args: baseArgs,
};

export const Upvoted = {
  args: {
    ...baseArgs,
    upVotesBy: ['user-99'],
  },
};

export const Downvoted = {
  args: {
    ...baseArgs,
    downVotesBy: ['user-99'],
  },
};
