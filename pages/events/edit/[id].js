import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';

// react toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditEventPage({event}) {
  const evt = event?.attributes;
	
	// form state
	const [values, setValues] = useState({
		name: evt.name,
		performers: evt.performers,
		venue: evt.venue,
		address: evt.address,
		date: evt.date,
		time: evt.time,
		description: evt.description,
	});

	// imagePreview state
	const [imagePreview, setImagePreview] = useState(evt.image.data? evt.image.data.attributes.formats.thumbnail.url : null);

	// modal state
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const handleModalShow = (e) => {
		e.preventDefault();
		scrollTo({ top: 0, behavior: 'smooth' });
		setShowModal(true);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		// validation
		const emptyFields = Object.values(values).some((element) => element === '');

		if (emptyFields) {
			toast.error('Please fill in all fields');
			return;
		}

		const res = await fetch(`${API_URL}/api/events/${event.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: {
					...values,
					slug: values.name.toLowerCase().split(' ').join('-'),
				},
			}),
		});

		if (!res.ok) {
			toast.error('Something Went Wrong');
		} else {
			const eventData = await res.json();
			router.push(`/events/${eventData.data.attributes.slug}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const imageUPloaded = async (e) => {
		const res = await (await fetch(`${API_URL}/api/events/${event.id}?populate=image`)).json();

		setImagePreview(res.data.attributes.image.data.attributes.formats.thumbnail.url);
		setShowModal(false);
	}

	return (
		<Layout title='Add new Event'>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							name='name'
							id='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Performers</label>
						<input
							type='text'
							name='performers'
							id='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							name='venue'
							id='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							value={moment(values.date).format('yyyy-MM-DD')}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='text'
							name='time'
							id='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}
					></textarea>
				</div>
				<input type='submit' value='Update Event' className='btn' />
			</form>

			{/* event image preview */}
			<h2>Event Image</h2>
			{imagePreview ? (
				<Image
					src={imagePreview}
					height={100}
					width={170}
					alt={
						evt.image.data
							? evt.image.data.attributes.alternativeText
							: 'Event Image'
					}
				/>
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}

			<div>
				<button onClick={handleModalShow} className="btn-secondary">
					<FaImage /> Set Image
				</button>
			</div>
			{/* modal */}
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload evtId={event.id} imageUPloaded={imageUPloaded} />
			</Modal>
		</Layout>
	);
};

export async function getServerSideProps({params: {id}}) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);
  const evt = await res.json();

  return{
    props: {
      event: evt.data,
    }
  }
}