import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUser } from '../authUser/slice';
import { setIsPreload } from './slice';

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      dispatch(setAuthUser(null));
      api.putAccessToken('');
    } finally {
      dispatch(setIsPreload(false));
      dispatch(hideLoading());
    }
  };
}

export { asyncPreloadProcess };