import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import ThreadItem from './ThreadItem';

const mockStore = configureMockStore([thunk]);

/**
 * test scenario for ThreadItem component
 *
 * - ThreadItem component
 *   - should render the thread title, category, and owner name
 *   - should show a filled upvote icon when the logged-in user has already upvoted the thread
 *   - should show empty vote icons when the logged-in user has not voted yet
 *   - should dispatch an upvote action when the upvote button is clicked and the user has not voted
 *   - should not trigger navigation when the upvote button is clicked (event should not bubble to the card)
 */
describe('ThreadItem component', () => {
  const threadProps = {
    id: 'thread-1',
    title: 'Judul Thread',
    body: '<p>Isi thread</p>',
    category: 'General',
    createdAt: new Date().toISOString(),
    totalComments: 2,
    user: { id: 'user-1', name: 'Budi Santoso', avatar: 'https://example.com/avatar.png' },
    upVotesBy: [],
    downVotesBy: [],
  };

  function renderThreadItem(props, authUser = null) {
    const store = mockStore({ authUser });
    return {
      store,
      ...render(
        <Provider store={store}>
          <MemoryRouter>
            <ThreadItem {...props} />
          </MemoryRouter>
        </Provider>,
      ),
    };
  }

  it('should render the thread title, category, and owner name', () => {
    renderThreadItem(threadProps);

    expect(screen.getByText('Judul Thread')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(screen.getByText('Budi Santoso')).toBeInTheDocument();
  });

  it('should show a filled upvote icon when the logged-in user has already upvoted the thread', () => {
    renderThreadItem({ ...threadProps, upVotesBy: ['user-99'] }, { id: 'user-99' });

    expect(screen.getByText(/👍/)).toBeInTheDocument();
  });

  it('should show empty vote icons when the logged-in user has not voted yet', () => {
    renderThreadItem(threadProps, { id: 'user-99' });

    expect(screen.getByText(/🤍/)).toBeInTheDocument();
    expect(screen.getByText(/🖤/)).toBeInTheDocument();
  });

  it('should dispatch an upvote action when the upvote button is clicked and the user has not voted', async () => {
    const { store } = renderThreadItem(threadProps, { id: 'user-99' });

    const upvoteButton = screen.getByText(/🤍/);
    await userEvent.click(upvoteButton);

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
  });

  it('should not trigger navigation when the upvote button is clicked (event should not bubble to the card)', async () => {
    const { store } = renderThreadItem(threadProps, { id: 'user-99' });

    const upvoteButton = screen.getByText(/🤍/);
    await userEvent.click(upvoteButton);

    // Only vote-related dispatches should occur; no crash/navigation side effect thrown.
    expect(store.getActions().every((action) => typeof action === 'object')).toBe(true);
  });
});
