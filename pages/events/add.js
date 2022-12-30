import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventPage = () => {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    const emptyFields = Object.values(values).some((element) => element === '');

    if(emptyFields) {
      toast.error('Please fill in all fields');
			return;
    }

		const eventData = {
			...values,
			slug: values.name.toLowerCase().split(' ').join('-'),
		};

    const res = await fetch(`${API_URL}/api/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({data: eventData}),
		});

    if(!res.ok) {
      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.data.attributes.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  return (
		<Layout title='Add new Event'>
			<Link href='/events'>Go Back</Link>
			<h1>Add Event</h1>
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
							value={values.date}
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
        <input type="submit" value="Add Event" className='btn' />
			</form>
		</Layout>
	);
}

export default AddEventPage;