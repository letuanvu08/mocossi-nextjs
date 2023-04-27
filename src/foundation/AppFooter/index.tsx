import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { Colors } from 'constants/theme';
import { ThemeSettings } from 'types/theme';

interface Props {
  isScrolling?: boolean;
  isScrollingDown?: boolean;
  themeSettings: ThemeSettings;
}

class AppFooter extends React.Component<Props> {
  render() {
    const {
      themeSettings: { isDesktop, isDesktopMedium },
    } = this.props;
    const isDesktopView = isDesktop || isDesktopMedium;

    return (
      <Layout.Footer style={{
        backgroundColor: Colors.Black01,
        color: Colors.White,
        lineHeight: '24px',
        padding: 16,
        ...isDesktopView ? { padding: 24 } : {},
      }}>
        Page Footer
      </Layout.Footer>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});

export default connect(mapStateToProps)(AppFooter);
