import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';

export default function SearchPage({ events }) {
  const router = useRouter()
	return (
		<Layout>
			<Link href='/events'>Go Back</Link>
			<h1>
				Search Result for <span style={{color: 'red'}}>{router.query.term}</span>
			</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt.attributes} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
		filters: {
			$or: [
				{ name: { $contains: term } },
				{ performers: { $contains: term } },
				{ description: { $contains: term } },
				{ venue: { $contains: term } },
			],
		},
	});

	const res = await fetch(
		`${API_URL}/api/events?populate=image&${query}&sort=date:asc`
	);

	const eventData = await res.json();
	const events = eventData.data;

	return {
		props: { events },
	};
}
