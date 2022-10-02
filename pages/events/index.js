import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';

export default function EventPage({ events }) {
	console.log(events);
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt.attributes} />
			))}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events?populate=image&sort=date:asc`);
	const eventData = await res.json();
	const events = eventData.data;

	return {
		props: { events },
		revalidate: 1,
	};
}
