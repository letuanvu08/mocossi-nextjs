import React from 'react';
import { Button, Drawer, Layout } from 'antd';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Colors } from 'constants/theme';
import { ThemeSettings } from 'types/theme';
import { User } from 'types/user';
import ModalCloseIcon from 'foundation/ModalCloseIcon';

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
    return (
      <a
        href="/"
        title="Go to homepage"
        style={{
          color: Colors.White,
          fontSize: 18,
          fontWeight: 700,
        }}
      >nftspring.io</a>
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
      fontWeight: 500,
      padding: 12,

      ':hover': {
        color: Colors.Primary,
      },

      ...isSmallView ? {
        marginTop: 4,
      } : {
        color: Colors.White,
        fontSize: 16,
        marginLeft: 4,
        padding: '6px 16px',

        ':hover': {
          color: Colors.Primary,
        },
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
    const btnConnectCss = css({
      color: Colors.Black,
      fontWeight: 500,

      ':hover': {
        color: Colors.Black,
      },
    });

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
          {...btnConnectCss}
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
    const btnConnectCss = css({
      color: Colors.Black,
      fontWeight: 500,
      paddingLeft: '24px !important',
      paddingRight: '24px !important',
      height: '48px !important',

      ':hover': {
        color: Colors.Black,
      },
    });

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
          {...btnConnectCss}
        >Connect wallet</Button>
      </div>
    );
  }

  render() {
    const {
      headerProps,
      themeSettings: { isMobile, isMobileMedium, isTablet, isDesktop, isDesktopMedium },
    } = this.props;
    const { style, ...nestedHeaderProps } = headerProps || {} ;
    const isSmallView = isMobile || isMobileMedium || isTablet;
    const isDesktopView = isDesktop || isDesktopMedium;

    return (
      <Layout.Header
        style={{
          backgroundColor: Colors.Black03,
          transition: '0.2s',
          height: 'auto',
          position: 'relative',
          lineHeight: '24px',
          zIndex: 300,
          padding: 16,
          ...isDesktopView ? { padding: 24 } : {},
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
