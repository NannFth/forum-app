import threadDetailReducer, {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpvoteThreadDetail,
  toggleDownvoteThreadDetail,
  toggleNeutralizeVoteThreadDetail,
} from './slice';

/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *   - should return the initial state (null) when given by unknown action
 *   - should return the thread detail when given by receiveThreadDetail action
 *   - should return null when given by clearThreadDetail action
 *   - should add a new comment to the beginning of the comments list
 *   - should toggle upvote correctly on the thread detail
 *   - should toggle downvote correctly on the thread detail
 *   - should neutralize vote on the thread detail
 *   - should return null (not throw) when reducer receives vote action while state is still null
 */
describe('threadDetailReducer', () => {
  const sampleThreadDetail = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Isi thread',
    createdAt: '2026-01-01T00:00:00.000Z',
    owner: { id: 'user-1', name: 'User Satu', avatar: 'avatar.png' },
    upVotesBy: [],
    downVotesBy: [],
    comments: [],
  };

  it('should return the initial state (null) when given by unknown action', () => {
    const nextState = threadDetailReducer(null, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should return the thread detail when given by receiveThreadDetail action', () => {
    const action = receiveThreadDetail(sampleThreadDetail);

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(sampleThreadDetail);
  });

  it('should return null when given by clearThreadDetail action', () => {
    const nextState = threadDetailReducer(sampleThreadDetail, clearThreadDetail());

    expect(nextState).toBeNull();
  });

  it('should add a new comment to the beginning of the comments list', () => {
    const initialState = { ...sampleThreadDetail, comments: [{ id: 'comment-1', content: 'lama' }] };
    const newComment = { id: 'comment-2', content: 'komentar baru' };

    const nextState = threadDetailReducer(initialState, addComment(newComment));

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should toggle upvote correctly on the thread detail', () => {
    const initialState = { ...sampleThreadDetail, upVotesBy: [], downVotesBy: [] };
    const action = toggleUpvoteThreadDetail({ userId: 'user-99' });

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toEqual(['user-99']);
  });

  it('should toggle downvote correctly on the thread detail', () => {
    const initialState = { ...sampleThreadDetail, upVotesBy: ['user-99'], downVotesBy: [] };
    const action = toggleDownvoteThreadDetail({ userId: 'user-99' });

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.downVotesBy).toEqual(['user-99']);
    expect(nextState.upVotesBy).toEqual([]);
  });

  it('should neutralize vote on the thread detail', () => {
    const initialState = { ...sampleThreadDetail, upVotesBy: ['user-99'], downVotesBy: [] };
    const action = toggleNeutralizeVoteThreadDetail({ userId: 'user-99' });

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toEqual([]);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should return null (not throw) when reducer receives vote action while state is still null', () => {
    const action = toggleUpvoteThreadDetail({ userId: 'user-99' });

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toBeNull();
  });
});
