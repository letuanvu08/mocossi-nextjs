import { ThemeActionType, storeAppTheme } from 'core/actions/theme';

const defaultState = {
  // primaryColor?: string;
  // accentColor?: string;

  isMobile: true,
  isMobileMedium: false,
  isTablet: false,
  isTabletMedium: false,
  isDesktop: false,
  isDesktopMedium: false,
  isScrolling: false,
  isScrollingDown: false,
};

const themeReducer = (state = defaultState, action: ThemeActionType) => {
  switch (action.type) {
    case storeAppTheme: {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
}

export default themeReducer;
