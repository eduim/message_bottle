import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { authContext } from '../lib/auth';
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <authContext.Provider value={null}>
      <Component {...pageProps} />
    </authContext.Provider>
  );
}

export default MyApp;
