import React from 'react';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const EventPage = ({ evt }) => {
    const deleteEvent = (e) => {
        console.log('delete');
    };

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt />
                            Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes />
                        Delete Event
                    </a>
                </div>
                <span>
                    {evt.date} as {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image} width={960} height={600} />
                    </div>
                )}
                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>
                <Link href={'/events'}>
                    <a className={styles.back}>{'<'} Go back</a>
                </Link>
            </div>
        </Layout>
    );
};

export default EventPage;

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
    // your fetch function here
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();
    const paths = events.map((evt) => ({
        params: { slug: evt.slug },
    }));

    return {
        paths,
        fallback: true,
    };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async ({ params: { slug } }) => {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json();
    return {
        props: {
            evt: events[0],
        },
        revalidate: 10,
    };
};
