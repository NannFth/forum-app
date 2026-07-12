import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  addThread,
  toggleUpvoteThread,
  toggleDownvoteThread,
  toggleNeutralizeVoteThread,
} from './slice';

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThread(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('Kamu harus login dulu untuk memberikan vote!');
      return;
    }
    dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThread({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('Kamu harus login dulu untuk memberikan vote!');
      return;
    }
    dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThread({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('Kamu harus login dulu untuk memberikan vote!');
      return;
    }
    dispatch(toggleNeutralizeVoteThread({ threadId, userId: authUser.id }));
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThread({ threadId, userId: authUser.id }));
    }
  };
}

export {
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralizeVoteThread,
};