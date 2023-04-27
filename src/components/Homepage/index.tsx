import React from 'react';
import { connect } from 'react-redux';
import { User } from 'types/user';
import { ThemeSettings } from 'types/theme';
import { withDispatchSession } from 'utils/redux-store';
import AppLayout from 'foundation/AppLayout';
import SectionHero from 'components/Homepage/SectionHero';

interface Props {
  currentUser: User;
  themeSettings: ThemeSettings;
}

class Homepage extends React.Component<Props> {
  render() {
    const fakeHeroBanners = [{
      image: 'https://placehold.co/600x400',
      caption: 'Purchase Mocossi merchandise or create your own with any NFTs',
      description: '',
      btnText: 'Read more',
      href: '#',
    }, {
      image: 'https://placehold.co/600x400',
      caption: 'Mocossi Planet: The best NFT game on Cardano 2023',
      description: '',
      btnText: 'Read more',
      href: '#',
    }];

    return (
      <AppLayout>
        <SectionHero
          banners={fakeHeroBanners}
        />

        <div style={{ minHeight: 300 }} />
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({
  themeSettings: state.themeStore,
});

export default connect(mapStateToProps)(withDispatchSession(Homepage));
