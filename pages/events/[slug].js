import React from 'react';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const EventPage = ({ evt, img }) => {
    const { id, attributes } = evt;
    const deleteEvent = (e) => {
        console.log('delete');
    };
    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${id}`}>
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
                    {attributes.date} as {attributes.time}
                </span>
                <h1>{attributes.name}</h1>
                <div className={styles.image}>
                    <Image src={img} width={960} height={600} />
                </div>
                <h3>Performers:</h3>
                <p>{attributes.performers}</p>
                <h3>Description:</h3>
                <p>{attributes.description}</p>
                <h3>Venue: {attributes.venue}</h3>
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
    const { data } = events;
    const paths = data.map((evt) => ({
        params: { slug: evt.attributes.slug },
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
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();
    const { data } = events;
    const resp = data.filter((evt) => evt.attributes.slug === slug);
    const [resultado] = resp;
    const res2 = await fetch(`${API_URL}/api/upload/files`);
    const imgs = await res2.json();
    const img = imgs.filter((evt) => evt.id === resultado.id);
    const [image] = img;
    return {
        props: {
            evt: resultado,
            img: image.url,
        },
        revalidate: 10,
    };
};
