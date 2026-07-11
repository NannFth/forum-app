import threadsReducer, {
  receiveThreads,
  addThread,
  toggleUpvoteThread,
  toggleDownvoteThread,
  toggleNeutralizeVoteThread,
} from './slice';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by receiveThreads action
 *   - should add a new thread to the beginning of the list when given by addThread action
 *   - should toggle upvote correctly when the thread has not been upvoted
 *   - should remove upvote when the thread has already been upvoted (toggle off)
 *   - should move a downvote to upvote when the thread was previously downvoted
 *   - should toggle downvote correctly when the thread has not been downvoted
 *   - should neutralize vote by removing user id from both upVotesBy and downVotesBy
 *   - should not throw when toggling vote on a threadId that does not exist in the state
 */
describe('threadsReducer', () => {
  const sampleThread = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Isi thread pertama',
    category: 'General',
    createdAt: '2026-01-01T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  };

  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by receiveThreads action', () => {
    const initialState = [];
    const threads = [sampleThread];
    const action = receiveThreads(threads);

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(threads);
  });

  it('should add a new thread to the beginning of the list when given by addThread action', () => {
    const initialState = [sampleThread];
    const newThread = { ...sampleThread, id: 'thread-2', title: 'Thread Kedua' };
    const action = addThread(newThread);

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toHaveLength(2);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should toggle upvote correctly when the thread has not been upvoted', () => {
    const initialState = [{ ...sampleThread, upVotesBy: [], downVotesBy: [] }];
    const action = toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-99' });

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual(['user-99']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should remove upvote when the thread has already been upvoted (toggle off)', () => {
    const initialState = [{ ...sampleThread, upVotesBy: ['user-99'], downVotesBy: [] }];
    const action = toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-99' });

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual([]);
  });

  it('should move a downvote to upvote when the thread was previously downvoted', () => {
    const initialState = [{ ...sampleThread, upVotesBy: [], downVotesBy: ['user-99'] }];
    const action = toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-99' });

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual(['user-99']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should toggle downvote correctly when the thread has not been downvoted', () => {
    const initialState = [{ ...sampleThread, upVotesBy: ['user-99'], downVotesBy: [] }];
    const action = toggleDownvoteThread({ threadId: 'thread-1', userId: 'user-99' });

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toEqual(['user-99']);
    expect(nextState[0].upVotesBy).toEqual([]);
  });

  it('should neutralize vote by removing user id from both upVotesBy and downVotesBy', () => {
    const initialState = [{ ...sampleThread, upVotesBy: ['user-99'], downVotesBy: [] }];
    const action = toggleNeutralizeVoteThread({ threadId: 'thread-1', userId: 'user-99' });

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should not throw when toggling vote on a threadId that does not exist in the state', () => {
    const initialState = [sampleThread];
    const action = toggleUpvoteThread({ threadId: 'thread-not-found', userId: 'user-99' });

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});
