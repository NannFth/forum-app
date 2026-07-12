import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpvoteThreadDetail,
  toggleDownvoteThreadDetail,
  toggleNeutralizeVoteThreadDetail,
} from './slice';

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetail());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addComment(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Kamu harus login dulu untuk memberikan vote!');
      return;
    }
    const userId = authUser.id;
    const threadId = threadDetail.id;
    dispatch(toggleUpvoteThreadDetail({ userId }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadDetail({ userId }));
    }
  };
}

function asyncToggleDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Kamu harus login dulu untuk memberikan vote!');
      return;
    }
    const userId = authUser.id;
    const threadId = threadDetail.id;
    dispatch(toggleDownvoteThreadDetail({ userId }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadDetail({ userId }));
    }
  };
}

function asyncToggleNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Kamu harus login dulu untuk memberikan vote!');
      return;
    }
    const userId = authUser.id;
    const threadId = threadDetail.id;
    dispatch(toggleNeutralizeVoteThreadDetail({ userId }));
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadDetail({ userId }));
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleNeutralizeVoteThreadDetail,
};