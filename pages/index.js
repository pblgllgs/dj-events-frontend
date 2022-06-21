import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';

export default function HomePage({ events }) {
    return (
        <Layout title={'Home'}>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events</h3>}

            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
            {events.length > 0 && (
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
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();
    return {
        props: { events: events.slice(0, 3) },
    };
};
