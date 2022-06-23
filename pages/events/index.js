import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function EventsPage({ data, imgs }) {
    return (
        <Layout title={'Home'}>
            <h1>Events</h1>
            {data.length === 0 && <h3>No events</h3>}

            {data.map((evt) => {
                return (
                    <EventItem
                        key={evt.attributes.slug}
                        evt={evt}
                        imgs={imgs}
                    />
                );
            })}
        </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getStaticProps = async () => {
    const res1 = await fetch(`${API_URL}/api/events`);
    const resp = await res1.json();
    const { data } = resp;
    const res2 = await fetch(`${API_URL}/api/upload/files`);
    const imgs = await res2.json();
    return {
        props: {
            data,
            imgs,
        },
        revalidate: 10,
    };
};
