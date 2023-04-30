import React from 'react';
import { css } from 'glamor';
import { Button, Col, Layout, Row } from 'antd';
import { connect } from 'react-redux';
import { Colors } from 'constants/theme';
import { ThemeSettings } from 'types/theme';
import AppContainer from 'foundation/AppContainer';
import Logo from 'foundation/Logo';

interface Props {
  isScrolling?: boolean;
  isScrollingDown?: boolean;
  themeSettings: ThemeSettings;
}

class AppFooter extends React.Component<Props> {
  private renderLogo = () => {
    return (
      <div style={{
        paddingBottom: 24,
      }}>
        <Logo style={{
          color: Colors.White,
          height: 28,
          width: 'auto',
        }} />

        <div style={{
          color: Colors.Gray01,
          lineHeight: '22px',
          paddingTop: 4,
          maxWidth: 320,
        }}>Design amazing digital experiences that create more happy in the world.</div>
      </div>
    );
  };

  private renderMenus = () => {
    const linkCss = css({
      textDecoration: 'none',

      ':hover': {
        textDecoration: 'underline',
      },
    });

    return (
      <div className="footer--menu-wrapper">
        <div className="block block--footer-menu">
          <div className="block-title">Product</div>
          <div className="block-content">
            <ul className="footer--menus">
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Overview</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Features</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Solutions</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Tutorials</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Pricing</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Releases</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="block block--footer-menu">
          <div className="block-title">Company</div>
          <div className="block-content">
            <ul className="footer--menus">
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>About us</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Careers</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Press</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Press</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>News</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Media kit</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="block block--footer-menu">
          <div className="block-title">Resources</div>
          <div className="block-content">
            <ul className="footer--menus">
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Blog</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Newsletter</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Newsletter</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Events</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Help centre</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Tutorials</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Support</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="block block--footer-menu">
          <div className="block-title">Social</div>
          <div className="block-content">
            <ul className="footer--menus">
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Twitter</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Discord</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Facebook</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>TikTok</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="block block--footer-menu">
          <div className="block-title">Legal</div>
          <div className="block-content">
            <ul className="footer--menus">
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Terms</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Privacy</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Cookies</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Licenses</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Settings</a>
              </li>
              <li className="footer--menu-item">
                <a href="#" {...linkCss}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  private renderStaticMenus = () => {
    const currDate = new Date();

    return (
      <div className="block block--footer-static-menus">
        <div className="block-content">
          &copy; {currDate.getFullYear()} NFTspring. All rights reserved.
        </div>
      </div>
    );
  };

  private renderSocials = () => {
    const socialLinkCss = css({
      color: Colors.White,
      textDecoration: 'none',
    });
    const socialButtonCss = css({
      // @TODO: need to update colors list
      color: '#98A2B3',
      textDecoration: 'none',
      ':hover': {
        color: `${Colors.White} !important`,
      },
    });

    return (
      <div className="footer--socials-wrapper">
        <div className="block block--footer-socials">
          <div className="block-content">
            <ul className="footer--menus">
              <li className="footer--menu-item">
                <a href="#" title="Twitter" target="_blank" {...socialLinkCss}>
                  <Button
                    type="text"
                    title="Twitter"
                    icon={<i className="ri-twitter-fill" style={{ fontSize: 32, position: 'relative', top: -4 }} />}
                    {...socialButtonCss}
                  />
                </a>
              </li>
              <li className="footer--menu-item">
                <a href="#" title="Discord" target="_blank" {...socialLinkCss}>
                  <Button
                    type="text"
                    title="Discord"
                    icon={<i className="ri-discord-fill" style={{ fontSize: 32, position: 'relative', top: -4 }} />}
                    {...socialButtonCss}
                  />
                </a>
              </li>
              <li className="footer--menu-item">
                <a href="#" title="Facebook" target="_blank" {...socialLinkCss}>
                  <Button
                    type="text"
                    title="Facebook"
                    icon={<i className="ri-facebook-circle-line" style={{ fontSize: 32, position: 'relative', top: -4 }} />}
                    {...socialButtonCss}
                  />
                </a>
              </li>
              <li className="footer--menu-item">
                <a href="#" title="Instagram" target="_blank" {...socialLinkCss}>
                  <Button
                    type="text"
                    title="Instagram"
                    icon={<i className="ri-instagram-line" style={{ fontSize: 32, position: 'relative', top: -4 }} />}
                    {...socialButtonCss}
                  />
                </a>
              </li>
              <li className="footer--menu-item">
                <a href="#" title="Tiktok" target="_blank" {...socialLinkCss}>
                  <Button
                    type="text"
                    title="Tiktok"
                    icon={<i className="ri-tiktok-fill" style={{ fontSize: 32, position: 'relative', top: -4 }} />}
                    {...socialButtonCss}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      themeSettings: { isMobile, isMobileMedium, isTablet, isTabletMedium },
    } = this.props;
    const isMobileView = isMobile || isMobileMedium;
    const isTabletView = isTablet || isTabletMedium;

    return (
      <Layout.Footer
        className="footer--wrapper"
        style={{
          backgroundColor: Colors.Black,
          color: Colors.White,
          lineHeight: '24px',
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 24,
          paddingTop: 32,

          ...!isMobileView ? { paddingTop: 40 } : {},
        }}
      >
        <AppContainer>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            ...!isMobileView && !isTabletView ? { flexDirection: 'row' } : {},
          }}>
            <div>{this.renderLogo()}</div>

            <div style={{
              ...!isMobileView && !isTabletView ? {
                flexGrow: 1,
                flexShrink: 1,
                marginLeft: 120,
              } : {},
            }}>{this.renderMenus()}</div>
          </div>

          <div style={{
            borderTop: `1px solid ${Colors.Black03}`,
            marginTop: 24,
            paddingTop: 16,
            display: 'flex',
            flexDirection: 'column',

            ...!isMobileView ? {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            } : {},
          }}>
            {this.renderStaticMenus()}
            {this.renderSocials()}
          </div>
        </AppContainer>
      </Layout.Footer>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});

export default connect(mapStateToProps)(AppFooter);
