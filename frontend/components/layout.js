/*
 This layout is now for the header part only.
 Footer can be added when needed.
 This layout can be used to optimize SEO
 */

import Head from 'next/head';

import styles from './layout.module.css';
import Navbar from './navbar';


const siteName = "CodeRush 1.0";

const Layout = WrappedComponent => {
    function Hoc(props) {
        console.log("in layout hoc, the props are", props)
        return (
            <>
                <Head>
                    <link rel='icon' href='/favicon.png' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> 
                    <meta name="og:title" content={siteName} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="description"
                        content="Learn how to build a personal website using Next.js"
                    />
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