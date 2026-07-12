import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import api from '../../utils/api';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './action';
import { setAuthUser, unsetAuthUser } from './slice';

jest.mock('../../utils/api');

const mockStore = configureMockStore([thunk]);

/**
 * test scenario for authUser thunk functions
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch setAuthUser with the logged-in profile when login and getOwnProfile both succeed
 *   - should call api.putAccessToken with the token returned from api.login
 *   - should call window.alert and NOT dispatch setAuthUser when api.login fails
 * - asyncUnsetAuthUser thunk
 *   - should dispatch unsetAuthUser and clear the access token
 */
describe('authUser thunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  describe('asyncSetAuthUser thunk', () => {
    const credentials = { email: 'adnan@example.com', password: 'rahasia123' };
    const fakeToken = 'fake-token-123';
    const fakeProfile = { id: 'user-1', name: 'Adnan', email: credentials.email };

    it('should dispatch setAuthUser with the logged-in profile when login and getOwnProfile both succeed', async () => {
      api.login.mockResolvedValue(fakeToken);
      api.getOwnProfile.mockResolvedValue(fakeProfile);
      const store = mockStore({});

      await store.dispatch(asyncSetAuthUser(credentials));

      const actions = store.getActions();
      expect(actions).toContainEqual(setAuthUser(fakeProfile));
    });

    it('should call api.putAccessToken with the token returned from api.login', async () => {
      api.login.mockResolvedValue(fakeToken);
      api.getOwnProfile.mockResolvedValue(fakeProfile);
      const store = mockStore({});

      await store.dispatch(asyncSetAuthUser(credentials));

      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    });

    it('should call window.alert and NOT dispatch setAuthUser when api.login fails', async () => {
      api.login.mockRejectedValue(new Error('Email atau password salah'));
      const store = mockStore({});

      await store.dispatch(asyncSetAuthUser(credentials));

      const actions = store.getActions();
      expect(window.alert).toHaveBeenCalledWith('Email atau password salah');
      expect(actions.find((action) => action.type === setAuthUser.type)).toBeUndefined();
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch unsetAuthUser and clear the access token', () => {
      const store = mockStore({});

      store.dispatch(asyncUnsetAuthUser());

      const actions = store.getActions();
      expect(actions).toContainEqual(unsetAuthUser());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
    });
  });
});
