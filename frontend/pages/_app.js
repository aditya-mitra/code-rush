import dynamic from 'next/dynamic'
import { Provider as NextAuthProvider } from 'next-auth/client';

import 'nprogress/nprogress.css';
import '../styles/globals.css'

const TopProgressBar = dynamic(
    () => {
        return import('../components/topProgressBar');
    },
    { ssr: false }
);

function MyApp({ Component, pageProps }) {
    
    return (
        <>
            <NextAuthProvider
                options={{
                    clientMaxAge: 0,
                    keepAlive: 0
                }}
                session={pageProps.session}>

                <TopProgressBar />
                <Component {...pageProps} />

            </NextAuthProvider>
        </>
    );
}

export default MyApp
