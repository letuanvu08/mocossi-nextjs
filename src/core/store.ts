import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'core/reducers/app';
import themeReducer from 'core/reducers/theme';
import userReducer from 'core/reducers/user';

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;

export function makeStore(helpers) {
  return configureStore({
    reducer: {
      appStore: appReducer,
      themeStore: themeReducer,
      userStore: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: { extraArgument: helpers },
      serializableCheck: false,
    }),
  });
}

const store = (helpers) => makeStore(helpers);
export default store;
