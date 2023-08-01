import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '../services/authConfigService'

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

msalInstance.handleRedirectPromise().then((result) => {
  console.log('handleRedirectPromise', result)
  if(result?.account) 
    {
      msalInstance.setActiveAccount(result?.account);
    }
});

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();

  return (
    <MsalProvider instance={msalInstance}> 
      <div className={inter.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </MsalProvider>
  );
}

export default appWithTranslation(App);
