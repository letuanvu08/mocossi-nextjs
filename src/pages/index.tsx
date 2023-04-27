import React from 'react';
import Cookies from 'universal-cookie';
import Head from 'next/head';
import { User } from 'types/user';
import { appName } from 'types/app';
import UserService from 'services/userService';
import Homepage from 'components/Homepage';

interface Props {
  currentUser: User;
}

class IndexPage extends React.Component<Props> {
  static async getInitialProps({ req }) {
    const cookies = new Cookies(req.headers.cookie);
    let currentUser = null;

    try {
      const session = await UserService().performAuth(cookies);
      currentUser = session;
    } catch(e) {}

    return {
      currentUser,
    };
  }

  render() {
    const {
      currentUser,
    } = this.props;
    const pageTitle = appName;

    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1" />
          <meta name="description" content="..." />
          <meta name="keywords" content="..." />

          <meta property="og:title" content={pageTitle} />
          <meta property="og:site_name" content={appName} />
          <meta property="og:description" content="..." />
          <meta property="og:image" content="..." />
          <meta property="og:url" content="..." />

          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content="..." />
          <meta name="twitter:image" content="..." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image:alt" content={appName} />
        </Head>

        <Homepage
          currentUser={currentUser}
        />
      </>
    );
  }
}

export default IndexPage;
