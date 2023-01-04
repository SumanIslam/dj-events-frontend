import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'

// components
import Search from './Search'

// hooks
import { useAuth } from '@/hooks/useAuth'

// styles
import styles from '@/styles/Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();
  return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>
					<a>DJ Events</a>
				</Link>
			</div>

			<Search />

			<nav>
				<ul>
					<li>
            {/* link to event page */}
						<Link href='/events'>
							<a>Events</a>
						</Link>
					</li>
					{user ? (
            // if logged in
						<>
							<li>
                {/* link to add event page */}
								<Link href='/events/add'>
									<a>Add Event</a>
								</Link>
							</li>
							<li>
                {/* link to add account dashboard page */}
								<Link href='/account/dashboard'>
									<a>Dashboard</a>
								</Link>
							</li>
              <li>
                {/*  logout  */}
                <button className='btn-secondary btn-icon' onClick={() => logout()}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
						</>
					) : (
            // if logged out
						<>
							<li>
                {/* link to login page */}
								<Link href='/account/login'>
									<a className='btn-secondary btn-icon'>
										<FaSignInAlt /> Login
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Header