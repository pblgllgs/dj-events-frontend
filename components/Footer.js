import Link from 'next/link';
import React from 'react';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Copiright &copy; DJ events 2022</p>
            <p>
                <Link href={'/about'}>
                    about this project
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
