import { storeUserUpdated, storeUserLogout, UserActionType } from 'core/actions/user';

const defaultState = null;

const userReducer = (state = defaultState, action: UserActionType) => {
  switch (action.type) {
    case storeUserUpdated: {
      return {
        ...state || {},
        ...action.payload,
      };
    }

    case storeUserLogout: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
}

export default userReducer;