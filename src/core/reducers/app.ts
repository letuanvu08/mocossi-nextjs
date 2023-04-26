import { AppActionType, storeAppData } from 'core/actions/app';

const defaultState = {
};

const appReducer = (state = defaultState, action: AppActionType) => {
  switch (action.type) {
    case storeAppData: {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
}

export default appReducer;
