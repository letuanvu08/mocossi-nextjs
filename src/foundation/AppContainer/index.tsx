import React from 'react';
import { connect } from 'react-redux';

const AppContainer = (props) => {
  const {
    children,
    isFullWith,
    className,
    style,
    themeSettings: { isMobileMedium, isTablet, isTabletMedium, isDesktop, isDesktopMedium },
    dispatch,
    ...restProps
  } = props;

  return (
    <div
      className={`container ${className || ''}`}
      style={{
        paddingLeft: 12,
        paddingRight: 12,

        ...isMobileMedium ? { paddingLeft: 16, paddingRight: 16 } : {},
        ...isTablet || isTabletMedium ? { paddingLeft: 24, paddingRight: 24 } : {},
        ...isDesktop || isDesktopMedium ? {
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          ...isFullWith ? {} : { maxWidth: 1200 },
        } : {},
        ...style,
      }}
      {...restProps}
    >{children}</div>
  );
};

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});
export default connect(mapStateToProps)(AppContainer);
