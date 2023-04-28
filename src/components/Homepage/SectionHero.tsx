import React from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { Button, Carousel, Col, Row } from 'antd';
import { Colors } from 'constants/theme';
import { ThemeSettings } from 'types/theme';
import AppContainer from 'foundation/AppContainer';

interface HeroBanner {
  image: string;
  caption?: string;
  description?: string;
  btnText?: string;
  href?: string;
}

interface Props {
  banners: HeroBanner[];
  themeSettings: ThemeSettings;
}

class SectionHero extends React.Component<Props> {
  private renderBanner = (banner: HeroBanner, index: number = 0) => {
    const {
      themeSettings: { isTablet, isTabletMedium, isDesktop, isDesktopMedium },
    } = this.props;
    const isTabletView = isTablet || isTabletMedium;
    const isLargeView = isDesktop || isDesktopMedium;
    const { image, caption, description, href, btnText } = banner;
    const btnCss = css({
      color: Colors.Black,
      fontSize: '18px !important',
      paddingLeft: '32px !important',
      paddingRight: '32px !important',
      height: '48px !important',

      ':hover': {
        color: Colors.Black,
      },

      ...isTabletView || isLargeView ? {
        height: '64px !important',
        fontSize: '24px !important',
        paddingLeft: '48px !important',
        paddingRight: '48px !important',
      } : {},
    });

    return (
      <div key={`section-hero--slide--${index + 1}`}>
        <div style={{
          position: 'relative',
          paddingBottom: 64,
          paddingTop: 32,
          ...isTabletView ? { paddingBottom: 100, paddingTop: 64 } : {},
          ...isLargeView ? { paddingBottom: 100, paddingTop: 72 } : {},
        }}>
          {/* <div style={{
            background: `linear-gradient(to right, rgba(0, 0, 0, 0.25), transparent)`,
            position: 'absolute',
            inset: 0,
            zIndex: 2,
          }} /> */}

          <AppContainer style={{ position: 'relative', zIndex: 4 }}>
            <Row gutter={24}>
              <Col md={{ span: 12 }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  maxWidth: '75%',
                  height: '100%',
                }}>
                  {caption && (
                    <h2 style={{
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: 0.2,
                      lineHeight: '32px',
                      margin: 0,

                      ...isTabletView || isLargeView ? {
                        fontSize: 36,
                        lineHeight: '48px',
                      } : {},
                    }}>{caption}</h2>
                  )}

                  {description && (
                    <div style={{
                      fontSize: 16,
                      letterSpacing: 0.6,
                      marginTop: 16,
                      lineHeight: '24px',

                      ...isTabletView || isLargeView ? { fontSize: 18 } : {},
                    }}>{description}</div>
                  )}

                  {href && (
                    <div style={{
                      marginTop: 32,
                      ...isTabletView || isLargeView ? { marginTop: 64 } : {},
                    }}>
                      <a href={href} title={btnText || 'Read more'}>
                        <Button
                          size="large"
                          type="primary"
                          {...btnCss}
                        >{btnText || 'Read more'}</Button>
                      </a>
                    </div>
                  )}
                </div>
              </Col>

              {(isTabletView || isLargeView) && (
                <Col md={{ span: 12 }}>
                  {image && (
                    <img src={image} alt={caption} style={{ maxWidth: '100%' }} />
                  )}
                </Col>
              )}
            </Row>
          </AppContainer>
        </div>
      </div>
    );
  };

  render() {
    const { banners } = this.props;
    const validBanners = (banners || []).filter(banner => {
      const {
        image,
        caption,
        description,
        btnText,
      } = banner;
      return image || caption || description || btnText;
    });

    if (validBanners.length > 0) {
      if (validBanners.length > 1) {
        return (
          <section
            className="ant-carousel--custom-dots"
            style={{ backgroundColor: Colors.Gray02 }}
          >
            <Carousel autoplay>
              {validBanners.map(this.renderBanner)}
            </Carousel>
          </section>
        );
      }

      return (
        <section style={{ backgroundColor: Colors.Gray02 }}>
          {this.renderBanner(banners[0])}
        </section>
      );
    }

    return null;
  }
};

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});
export default connect(mapStateToProps)(SectionHero);
