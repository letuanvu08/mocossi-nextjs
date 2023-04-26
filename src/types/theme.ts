export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeView {
  Mobile = 'Mobile',
  MobileMedium = 'MobileMedium',
  Tablet = 'Tablet',
  TabletMedium = 'TabletMedium',
  Desktop = 'Desktop',
  DesktopMedium = 'DesktopMedium',
}

export interface ThemeSettings {
  type?: ThemeType;
  currentView?: ThemeView;

  primaryColor?: string;
  accentColor?: string;
  isMobile?: boolean;
  isMobileMedium?: boolean;
  isTablet?: boolean;
  isTabletMedium?: boolean;
  isDesktop?: boolean;
  isDesktopMedium?: boolean;
}
