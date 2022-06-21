import Head from 'next/head';
import React from 'react';
import styles from '@/styles/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import { useRouter } from 'next/router';
import Showcase from './Showcase';
// import PropTypes from 'prop-types';

const Layout = ({ title, keywords, description, children }) => {

    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <meta name="keywords" content={keywords}></meta>
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: 'DJ events',
    keywords:
        'dj events, dj, events, music, music events, music festival, music festival events, music festival events',
    description: 'welcome to dj events',
};

// Layout.propTypes = {
//     title: PropTypes.string.isRequired,
//     keywords: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
// };

export default Layout;
