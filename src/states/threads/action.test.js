import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import api from '../../utils/api';
import {
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralizeVoteThread,
} from './action';
import { addThread, toggleUpvoteThread, toggleDownvoteThread, toggleNeutralizeVoteThread } from './slice';

jest.mock('../../utils/api');

const mockStore = configureMockStore([thunk]);

/**
 * test scenario for threads thunk functions
 *
 * - asyncAddThread thunk
 *   - should dispatch addThread action with the created thread when api call succeeds
 *   - should call window.alert and not dispatch addThread when api call fails
 * - asyncToggleUpvoteThread thunk
 *   - should dispatch toggleUpvoteThread optimistically then call api.upVoteThread when user is logged in
 *   - should alert and NOT dispatch any vote action when user is not logged in
 *   - should rollback (dispatch neutralize) when api.upVoteThread call fails
 * - asyncToggleDownvoteThread thunk
 *   - should dispatch toggleDownvoteThread optimistically then call api.downVoteThread when user is logged in
 * - asyncToggleNeutralizeVoteThread thunk
 *   - should dispatch toggleNeutralizeVoteThread and call api.neutralizeVoteThread when user is logged in
 */
describe('threads thunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  describe('asyncAddThread thunk', () => {
    it('should dispatch addThread action with the created thread when api call succeeds', async () => {
      const newThread = { id: 'thread-1', title: 'Judul', body: 'Isi', category: 'General' };
      api.createThread.mockResolvedValue(newThread);
      const store = mockStore({});

      await store.dispatch(asyncAddThread({ title: 'Judul', body: 'Isi', category: 'General' }));

      const actions = store.getActions();
      expect(actions).toContainEqual(addThread(newThread));
    });

    it('should call window.alert and not dispatch addThread when api call fails', async () => {
      api.createThread.mockRejectedValue(new Error('Gagal membuat thread'));
      const store = mockStore({});

      await store.dispatch(asyncAddThread({ title: 'Judul', body: 'Isi', category: 'General' }));

      const actions = store.getActions();
      expect(window.alert).toHaveBeenCalledWith('Gagal membuat thread');
      expect(actions.find((action) => action.type === addThread.type)).toBeUndefined();
    });
  });

  describe('asyncToggleUpvoteThread thunk', () => {
    it('should dispatch toggleUpvoteThread optimistically then call api.upVoteThread when user is logged in', async () => {
      api.upVoteThread.mockResolvedValue();
      const store = mockStore({ authUser: { id: 'user-1' } });

      await store.dispatch(asyncToggleUpvoteThread('thread-1'));

      const actions = store.getActions();
      expect(actions).toContainEqual(toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-1' }));
      expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    });

    it('should alert and NOT dispatch any vote action when user is not logged in', async () => {
      const store = mockStore({ authUser: null });

      await store.dispatch(asyncToggleUpvoteThread('thread-1'));

      const actions = store.getActions();
      expect(window.alert).toHaveBeenCalledWith('Kamu harus login dulu untuk memberikan vote!');
      expect(actions).toHaveLength(0);
      expect(api.upVoteThread).not.toHaveBeenCalled();
    });

    it('should rollback (dispatch neutralize) when api.upVoteThread call fails', async () => {
      api.upVoteThread.mockRejectedValue(new Error('Gagal upvote'));
      const store = mockStore({ authUser: { id: 'user-1' } });

      await store.dispatch(asyncToggleUpvoteThread('thread-1'));

      const actions = store.getActions();
      expect(actions).toContainEqual(toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-1' }));
      expect(actions).toContainEqual(toggleNeutralizeVoteThread({ threadId: 'thread-1', userId: 'user-1' }));
      expect(window.alert).toHaveBeenCalledWith('Gagal upvote');
    });
  });

  describe('asyncToggleDownvoteThread thunk', () => {
    it('should dispatch toggleDownvoteThread optimistically then call api.downVoteThread when user is logged in', async () => {
      api.downVoteThread.mockResolvedValue();
      const store = mockStore({ authUser: { id: 'user-1' } });

      await store.dispatch(asyncToggleDownvoteThread('thread-1'));

      const actions = store.getActions();
      expect(actions).toContainEqual(toggleDownvoteThread({ threadId: 'thread-1', userId: 'user-1' }));
      expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    });
  });

  describe('asyncToggleNeutralizeVoteThread thunk', () => {
    it('should dispatch toggleNeutralizeVoteThread and call api.neutralizeVoteThread when user is logged in', async () => {
      api.neutralizeVoteThread.mockResolvedValue();
      const store = mockStore({ authUser: { id: 'user-1' } });

      await store.dispatch(asyncToggleNeutralizeVoteThread('thread-1'));

      const actions = store.getActions();
      expect(actions).toContainEqual(toggleNeutralizeVoteThread({ threadId: 'thread-1', userId: 'user-1' }));
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith('thread-1');
    });
  });
});
