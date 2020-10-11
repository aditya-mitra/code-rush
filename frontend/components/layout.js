/*
 This layout is now for the header part only.
 Footer can be added when needed.
 This layout can be used to optimize SEO
 */

import Head from 'next/head';

import styles from './layout.module.css';
import Navbar from './navbar';


const siteName = "CodeRush";

const Layout = WrappedComponent => {
    function Hoc(props) {
        if (process.env.NODE_ENV === 'development')
            console.log("in layout hoc, the props are", props);
        return (
            <>
                <Head>
                    <link rel='icon' href='/favicon.png' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

                    <meta property="og:title" content="CodeRush - Your place to code" />
                    <meta property="og:site_name" content={siteName} />
                    <meta property="og:url" content="https://code-rush.vercel.app/" />
                    <meta property="og:description" content="CodeRush is a competitive coding platform" />
                    <meta property="og:image" content="https://qph.fs.quoracdn.net/main-qimg-011de5342604fe4790a86357beec5ee5" />

                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    <title>{siteName}</title>
                </Head>
                <Navbar />
                <main>
                    <WrappedComponent {...props}/>
                </main>
            </>
        );
    }
    return Hoc;
}

export default Layout;
