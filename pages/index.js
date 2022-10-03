import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem';
import Link from 'next/link';

export default function Home({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {/* showing message if there is no events */}
      {
        events.length === 0 && <h3>No events to show</h3>
      }
      {/* showing upcoming events */}
      {
        events.map(evt => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))
      }
      {/* all events link */}
      {
        events.length > 0 && (
          <Link href='/events'>
            <a className="btn-secondary">View All Events</a>
          </Link>
        )
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(
		`${API_URL}/api/events?populate=image&sort=date:asc`
	);

  const eventData = await res.json();
  const events = eventData.data;

  return{
    props: { events: events.slice(0,3) },
    revalidate: 1,
  }
}