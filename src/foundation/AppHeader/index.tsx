import React from 'react';
import { Button, Drawer, Layout } from 'antd';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Colors } from 'constants/theme';
import { ThemeSettings } from 'types/theme';
import { User } from 'types/user';
import ModalCloseIcon from 'foundation/ModalCloseIcon';
import Logo from 'foundation/Logo';

interface Props {
  isScrolling?: boolean;
  isScrollingDown?: boolean;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;

  currentUser: User;
  themeSettings: ThemeSettings;
}

interface States {
  isMenusVisible?: boolean;
}

class AppHeader extends React.Component<Props, States> {
  state;

  constructor(props) {
    super(props);
    this.state = {};
  }

  private renderLogo() {
    const {
      themeSettings: { isMobile, isMobileMedium },
    } = this.props;
    const isMobileView = isMobile || isMobileMedium;

    return (
      <a
        href="/"
        title="Go to homepage"
        style={{
          color: Colors.Black,
          fontSize: 18,
          fontWeight: 700,
          position: 'relative',
          top: 4,
        }}
      >
        <Logo style={{
          height: 20,
          width: 'auto',

          ...isMobileView ? {} : { height: 28 },
        }} />
      </a>
    );
  }

  private renderMainMenus() {
    const {
      themeSettings: { isMobile, isMobileMedium, isTablet },
    } = this.props;
    const isSmallView = isMobile || isMobileMedium || isTablet;
    const menus: any[] = [{
      name: 'NFT projects',
      href: '/nft',
    }, {
      name: 'Marketplace',
      href: '/marketplace',
    }, {
      name: 'About',
      href: '/about',
    }, {
      name: 'Products',
      href: '/products',
    }, {
      name: 'Roadmap',
      href: '/roadmap',
    }];
    const menuCss = css({
      color: Colors.TextColor,
      fontSize: 20,
      padding: 12,

      ':hover': {
        color: Colors.Primary,
      },

      ...isSmallView ? {
        marginTop: 4,
      } : {
        fontSize: 16,
        marginLeft: 4,
        padding: '6px 16px',
      },
    });

    return (
      <div style={{
        display: 'flex',
        ...isSmallView ? {
          flexDirection: 'column',
          textAlign: 'center',
        } : {},
      }}>
        {menus.map((menu, idx) => {
          return (
            <a
              key={`main--menu-${idx}`}
              title={menu.name}
              href={menu.href}
              {...menuCss}
            >{menu.name}</a>
          );
        })}
      </div>
    );
  }

  private renderMobileView() {
    const { isMenusVisible } = this.state;

    return (
      <div style={{
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <Button
          size="large"
          type="primary"
        >Connect wallet</Button>

        <Button
          size="large"
          icon={<i className="ri-menu-line" style={{ fontSize: 20 }} />}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12,
          }}
          onClick={() => this.setState({ isMenusVisible: true })}
        />

        <Drawer
          width="100%"
          closable={true}
          destroyOnClose={true}
          open={isMenusVisible}
          closeIcon={<ModalCloseIcon />}
          maskStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.9)' }}
          headerStyle={{ height: 0, padding: 0 }}
          contentWrapperStyle={{ maxWidth: '100%' }}
          onClose={() => this.setState({ isMenusVisible: false })}
        >
          <div style={{ paddingTop: 32 }}>
            {this.renderMainMenus()}
          </div>
        </Drawer>
      </div>
    );
  }

  private renderDesktopView() {
    return (
      <div style={{
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <div style={{ marginRight: 24 }}>{this.renderMainMenus()}</div>
        <Button
          size="large"
          type="primary"
        >Connect wallet</Button>
      </div>
    );
  }

  render() {
    const {
      headerProps,
      themeSettings: { isMobile, isMobileMedium, isTablet },
    } = this.props;
    const { style, ...nestedHeaderProps } = headerProps || {} ;
    const isSmallView = isMobile || isMobileMedium || isTablet;

    return (
      <Layout.Header
        style={{
          backgroundColor: Colors.White,
          transition: '0.2s',
          height: 'auto',
          position: 'relative',
          lineHeight: '24px',
          zIndex: 300,
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 12,
          paddingTop: 12,
          ...isSmallView ? {} : { paddingLeft: 16, paddingRight: 16 },
          ...style || {},
        }}
        {...nestedHeaderProps}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {this.renderLogo()}
          {isSmallView && this.renderMobileView()}
          {!isSmallView && this.renderDesktopView()}
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
  currentUser: state.userStore,
});

export default connect(mapStateToProps)(AppHeader);
