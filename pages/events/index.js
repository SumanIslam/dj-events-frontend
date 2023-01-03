import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';

import { PER_PAGE } from '@/config/index'

export default function EventPage({ events, page, total }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt.attributes} />
			))}
			<Pagination page={page} total={total} />
		</Layout>
	);
}

export async function getServerSideProps({query: { page = 1 }}) {
	// calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

	const res = await fetch(
		`${API_URL}/api/events?populate=image&sort=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&pagination[withCount]=${true}`
	);
	const eventData = await res.json();
	const events = eventData.data;

	return {
		props: { events, page: +page, total: eventData.meta.pagination.total },
	};
}
