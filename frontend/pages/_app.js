import {Provider as NextAuthProvider} from 'next-auth/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return(
    <NextAuthProvider
    options={{
      clientMaxAge:0,
      keepAlive:0
    }}
    session={pageProps.session}>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp
