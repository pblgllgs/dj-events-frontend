import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';

export default function SearchPage({ data, imgs }) {
    const router = useRouter();
    return (
        <Layout title={'Search Events'}>
            <Link href="/events">
                <a>{'<'} Go back</a>
            </Link>
            <h1>Search Events results for: {router.query.term}</h1>
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
export const getServerSideProps = async ({ query: { term } }) => {
    const query = qs.stringify({
        filters: {
            $or: [
                {
                    slug: {
                        $containsi: term,
                    },
                },
                {
                    performers: {
                        $containsi: term,
                    },
                },
                {
                    name: {
                        $containsi: term,
                    },
                },
                {
                    venue: {
                        $containsi: term,
                    },
                },
            ],
        },
    });
    const res1 = await fetch(`${API_URL}/api/events?${query}`);
    const resp = await res1.json();
    const { data } = resp;
    console.log(data);
    const res2 = await fetch(`${API_URL}/api/upload/files`);
    const imgs = await res2.json();
    return {
        props: {
            data,
            imgs,
        },
    };
};
