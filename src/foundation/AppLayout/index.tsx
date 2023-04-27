import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { User } from 'types/user';
import { Breakpoints } from 'constants/theme';
import { ThemeSettings, ThemeView } from 'types/theme';
import { themeActions } from 'core/actions/theme';
import AppHeader from 'foundation/AppHeader';
import AppFooter from 'foundation/AppFooter';

interface Props {
  children: ReactNode;
  scrollTopSpace?: number;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;

  userInfo: User;
  themeSettings: ThemeSettings;
  storeTheme: (settings) => void;
}

interface State {
  isMobile: boolean;
  isMobileMedium: boolean;
  isTablet: boolean;
  isTabletMedium: boolean;
  isDesktop: boolean;
  isDesktopMedium: boolean;

  currentView: ThemeView;
  currentScroll?: number;
  isScrolling?: boolean;
  isScrollingDown?: boolean;
}

class AppLayout extends Component<Props, State> {
  state;

  constructor(props) {
    super(props);
    const {
      isMobile,
      isMobileMedium,
      isTablet,
      isTabletMedium,
      isDesktop,
      isDesktopMedium,
      isScrolling,
      isScrollingDown,
      currentView,
    } = props.themeSettings || {};

    this.state = {
      isMobile,
      isMobileMedium,
      isTablet,
      isTabletMedium,
      isDesktop,
      isDesktopMedium,
      isScrolling,
      isScrollingDown,
      currentView,
      currentScroll: 0,
    };
  }

  componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('scroll', () => this.onContentScrolled());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onWindowResize());
    window.removeEventListener('scroll', () => this.onContentScrolled());
  }

  private onWindowResize() {
    const { storeTheme } = this.props;
    const { currentView } = this.state;
    const windowWidth = window.innerWidth;

    let windowView = ThemeView.Mobile;
    let isMobile = false, isMobileMedium = false, isTablet = false, isTabletMedium = false, isDesktop = false, isDesktopMedium = false;

    if (windowWidth >= Breakpoints.DesktopMedium) {
      isDesktopMedium = true;
      windowView = ThemeView.DesktopMedium;
    } else if (windowWidth >= Breakpoints.Desktop) {
      isDesktop = true;
      windowView = ThemeView.Desktop;
    } else if (windowWidth >= Breakpoints.TabletMedium) {
      isTabletMedium = true;
      windowView = ThemeView.TabletMedium;
    } else if (windowWidth >= Breakpoints.Tablet) {
      isTablet = true;
      windowView = ThemeView.Tablet;
    } else if (windowWidth >= Breakpoints.Mobile) {
      isMobileMedium = true;
      windowView = ThemeView.MobileMedium;
    } else {
      isMobile = true;
      windowView = ThemeView.Mobile;
    }

    this.setState({
      currentView: windowView,
      isMobile,
      isMobileMedium,
      isTablet,
      isTabletMedium,
      isDesktop,
      isDesktopMedium,
    });

    if (currentView !== windowView) {
      storeTheme({
        currentView: windowView,
        isMobile,
        isMobileMedium,
        isTablet,
        isTabletMedium,
        isDesktop,
        isDesktopMedium,
      });
    }
  }

  private onContentScrolled() {
    const { scrollTopSpace, storeTheme } = this.props;
    const {
      isMobile,
      isMobileMedium,
      currentScroll,
      isScrolling,
      isScrollingDown,
    } = this.state;
    const scrollTopPoint = scrollTopSpace || (isMobile || isMobileMedium ? 120 : 140);
    const scrollTop = window.scrollY || 0;

    let scrollState = isScrolling;
    if (scrollTop <= scrollTopPoint) {
      if (isScrolling) {
        scrollState = false;
      }
    } else if (!isScrolling) {
      scrollState = true;
    }

    if (scrollState !== isScrolling) {
      this.setState({ isScrolling: scrollState });
      storeTheme({ isScrolling: scrollState });
    }

    if (scrollTop > 0) {
      if (scrollTop > currentScroll) {
        this.setState({
          currentScroll: scrollTop,
          ...!isScrollingDown ? { isScrollingDown: true } : {},
        });
        storeTheme({ isScrollingDown: true });
      } else if (currentScroll - scrollTop > 64) {
        this.setState({
          currentScroll: scrollTop,
          ...isScrollingDown ? { isScrollingDown: false } : {},
        });
        storeTheme({ isScrollingDown: false });
      }
    } else {
      this.setState({ isScrollingDown: false, currentScroll: 0 });
      storeTheme({ isScrollingDown: false });
    }
  }

  private renderPageHeader() {
    const { headerProps, renderHeader } = this.props;

    if (renderHeader) {
      return renderHeader();
    }

    const { isScrolling, isScrollingDown } = this.state;
    return (
      <AppHeader
        isScrolling={isScrolling}
        isScrollingDown={isScrollingDown}
        {...headerProps}
      />
    );
  }

  private renderPageFooter() {
    const { footerProps, renderFooter } = this.props;

    if (renderFooter) {
      return renderFooter();
    }

    const { isScrolling, isScrollingDown } = this.state;
    return (
      <AppFooter
        isScrolling={isScrolling}
        isScrollingDown={isScrollingDown}
        {...footerProps}
      />
    );
  }

  private renderPageContent() {
    const { children, contentProps } = this.props;

    return (
      <Layout.Content
        {...contentProps}
      >{children}</Layout.Content>
    );
  }

  render() {
    const { containerProps } = this.props;
    const { style, ...nestedContainerProps } = containerProps || {};

    return (
      <Layout
        style={{ minHeight: '100vh', ...style }}
        {...nestedContainerProps}
      >
        {this.renderPageHeader()}
        {this.renderPageContent()}
        {this.renderPageFooter()}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
  userInfo: state.userStore,
});
const mapDispatchToProps = dispatch => ({
  storeTheme: settings => dispatch(themeActions.storeTheme(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
