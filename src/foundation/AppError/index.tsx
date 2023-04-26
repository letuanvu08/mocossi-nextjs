import React from 'react';
import { connect } from 'react-redux';
import { Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import { User } from 'types/user';
import { withDispatchSession } from 'utils/redux-store';

const errorMessages = {
  403: 'Sorry, you are not authorized to access this page.',
  404: 'Sorry, the page you visited does not exist.',
  500: 'Sorry, the server is wrong.',
  common: 'Sorry, something went wrong.',
};

interface Props {
  statusCode: ResultStatusType;
  currentUser: User;
}

class ErrorComponent extends React.Component<Props> {
  render() {
    const { statusCode } = this.props;

    return (
      <div style={{ paddingBottom: 32, paddingTop: 32 }}>
        <Result
          status={statusCode}
          title={<div style={{ fontWeight: 700 }}>{statusCode}</div>}
          subTitle={<div style={{ fontSize: 16 }}>{errorMessages[statusCode] || errorMessages.common}</div>}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});

export default connect(mapStateToProps)(withDispatchSession(ErrorComponent));
