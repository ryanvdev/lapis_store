import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
//import Link from 'next/link';
//import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={'lapis-page home'}>
            <Head>
                <title>Index</title>
            </Head>
            <div>
                <main>
                    <div>This is index page</div>
                </main>
            </div>
        </div>
    );
};

export default Home;
