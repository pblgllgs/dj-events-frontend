import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';

export default function HomePage({ data, imgs }) {
    return (
        <Layout title={'Home'}>
            <h1>Upcoming Events</h1>
            {data.length === 0 && <h3>No events</h3>}

            {data.map((evt) => (
                <EventItem key={evt.id} evt={evt} imgs={imgs} />
            ))}
            {data.length > 0 && (
                <Link href={'/events'}>
                    <a className="btn-secondary">View all events</a>
                </Link>
            )}
        </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async () => {
    const res1 = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3`);
    const events = await res1.json();
    const { data } = events;

    const res2 = await fetch(`${API_URL}/api/upload/files`);
    const imgs = await res2.json();
    return {
        props: { data, imgs },
    };
};
