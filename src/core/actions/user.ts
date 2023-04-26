import UserService, { saveSession, removeSession } from 'services/userService';

export const storeUserUpdated = 'user.updated';
export const storeUserLogout = 'user.logout';

export interface UserActionType {
  type: typeof storeUserUpdated | typeof storeUserLogout;
  payload: any;
}

export const userActions = {
  storeAccount(payload) {
    return {
      type: storeUserUpdated,
      payload,
    };
  },

  updateRequestAuth(user) {
    return (dispatch, getState, { http }) => {
      return UserService(http).updateRequestAuth(user);
    };
  },

  performAuth() {
    return (dispatch, getState, { http }) => {
      return UserService(http).performAuth()
        .then(currentUser => {
          saveSession(currentUser);
          return currentUser;
        })
        .catch(() => {
          removeSession();
          return {};
        });
    };
  },
};
