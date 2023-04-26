import React from 'react';
import { connect } from 'react-redux';
import { userActions } from 'core/actions/user';
import { saveSession } from 'services/userService';

const ComponentContainer = (Component) => class extends React.Component<any, any> {
  componentDidMount() {
    try {
      const { currentUser, storeAccount, updateRequestAuth } = this.props;

      if (currentUser) {
        updateRequestAuth(currentUser);
        saveSession(currentUser);
        storeAccount(currentUser);
      }
    } catch(e) {}
  }

  render() {
    return (
      <Component {...this.props} />
    );
  }
};

const mapDispatchToProps = dispatch => ({
  storeAccount: options => dispatch(userActions.storeAccount(options)),
  updateRequestAuth: options => dispatch(userActions.updateRequestAuth(options)),
});
export const withDispatchSession = Page => connect(null, mapDispatchToProps)(ComponentContainer(Page));
