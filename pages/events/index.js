import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
    return (
        <Layout title={'Home'}>
            <h1>Events</h1>
            {/* {events.length === 0 && <h3>No events</h3>} */}

            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getStaticProps = async () => {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();
    return {
        props: {
            events,
        },
        revalidate: 10,
    };
};
