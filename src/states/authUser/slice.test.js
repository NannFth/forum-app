import authUserReducer, { setAuthUser, unsetAuthUser } from './slice';

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state (null) when given by unknown action
 *   - should set the authUser when given by setAuthUser action
 *   - should replace the previous authUser when setAuthUser is dispatched again
 *   - should return null when given by unsetAuthUser action
 */
describe('authUserReducer', () => {
  const sampleUser = {
    id: 'user-1',
    name: 'Adnan',
    email: 'adnan@example.com',
    avatar: 'avatar.png',
  };

  it('should return the initial state (null) when given by unknown action', () => {
    const nextState = authUserReducer(null, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should set the authUser when given by setAuthUser action', () => {
    const nextState = authUserReducer(null, setAuthUser(sampleUser));

    expect(nextState).toEqual(sampleUser);
  });

  it('should replace the previous authUser when setAuthUser is dispatched again', () => {
    const anotherUser = { ...sampleUser, id: 'user-2', name: 'User Lain' };

    const nextState = authUserReducer(sampleUser, setAuthUser(anotherUser));

    expect(nextState).toEqual(anotherUser);
  });

  it('should return null when given by unsetAuthUser action', () => {
    const nextState = authUserReducer(sampleUser, unsetAuthUser());

    expect(nextState).toBeNull();
  });
});
