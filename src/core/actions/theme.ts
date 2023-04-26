import { ThemeSettings } from 'types/theme';

export const storeAppTheme = 'app.theme';

export interface ThemeActionType {
  type: typeof storeAppTheme;
  payload: ThemeSettings;
}

export const themeActions = {
  storeTheme(payload): ThemeActionType {
    return {
      type: storeAppTheme,
      payload,
    };
  },
};
