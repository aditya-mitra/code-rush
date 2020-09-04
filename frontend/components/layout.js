/*
 This layout is now for the header part only.
 Footer can be added when needed.
 This layout can be used to optimize SEO
 */

import Head from 'next/head';
import Link from 'next/link';

import styles from './layout.module.css';


const siteName = "CodeRush 1.0";

const Layout = WrappedComponent => {
    function Hoc(props) {
        return (
            <>
                <Head>
                    <link rel='icon' href='/favicon.png' />
                    <meta name="og:title" content={siteName} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="description"
                        content="Learn how to build a personal website using Next.js"
                    />
                    <title>{siteName}</title>
                </Head>
                <main>
                    <WrappedComponent />
                </main>
            </>
        );
    }
    return Hoc;
}

export default Layout;