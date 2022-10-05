import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import styles from '@/styles/Event.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({event}) {
	const evt = event.attributes;

	const router = useRouter();
	
  const deleteEvent = async (e) => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/api/events/${event.id}`, {
				method: 'DELETE',
			});

			if(!res.ok) {
				toast.error('something went wrong')
			} else {
				router.push('/events')
			}
		}
	};

  return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${event.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href='#' className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<ToastContainer />
				<span>
					{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				{evt.image && (
					<div className={styles.image}>
						<Image
							src={
								evt.image.data
									? evt.image.data.attributes.formats.large.url
									: '/images/event-default.png'
							}
							width={960}
							height={600}
							alt={evt.image.data? evt.image.data.attributes.alternativeText : 'Event Image'}
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{evt.performers}</p>
				<h3>Description:</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<Link href='/events'>
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events/`);
  const eventData = await res.json();
  const events = await eventData.data;

  const paths = events.map(evt => ({
    params: {slug: evt.attributes.slug}
  }));

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
		`${API_URL}/api/events/?populate=image&sort=date:asc&filters[slug][$eq]=${slug}`
	);

  const eventData = await res.json();
  const events = eventData.data;

  return {
    props: {
      event: events[0]
    },
    revalidate: 1
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);

//   const events = await res.json();

//   console.log(events);

//   return {
//     props: {
//       evt: events[0]
//     },
//   }
// }