import { useRouter } from 'next/router';
import React from 'react';
import Layout from '@/components/Layout';

const EventPage = () => {
    const router = useRouter();
    return (
        <Layout>
            <h1>My Event</h1>
            <h1>{router.query.slug}</h1>
        </Layout>
    );
};

export default EventPage;
