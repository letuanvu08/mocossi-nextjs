import 'core/styles.scss';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { makeStore } from 'core/store';
import StoreSettings from 'core/settings';
import AppContext from 'core/context';

const context = StoreSettings().getStoreContext();
const store = makeStore(context);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider value={context}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AppContext.Provider>
  );
}
