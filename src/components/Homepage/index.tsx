import React from 'react';
import { connect } from 'react-redux';
import { User } from 'types/user';
import { ThemeSettings } from 'types/theme';
import { withDispatchSession } from 'utils/redux-store';
import AppLayout from 'foundation/AppLayout';

interface Props {
  currentUser: User;
  themeSettings: ThemeSettings;
}

class Homepage extends React.Component<Props> {
  render() {
    return (
      <AppLayout>
        Homepage content
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});

export default connect(mapStateToProps)(withDispatchSession(Homepage));
