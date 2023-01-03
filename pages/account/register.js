import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

const Login = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

    if(password !== confirmPassword) {
      toast.error('Password do not match')
    }
		console.log({ userName, email, password, confirmPassword });
	};

	return (
		<Layout title='User Registration'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					{/* username */}
					<div>
						<label htmlFor='userName'>Username</label>
						<input
							type='text'
							id='userName'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					{/* email */}
					<div>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					{/* password */}
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{/* confirm password */}
					<div>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<input type='submit' value='Login' className='btn' />
				</form>
				<p>
					Already have an account?{' '}
					<Link href='/account/login'>Login</Link>
				</p>
			</div>
		</Layout>
	);
};

export default Login;
