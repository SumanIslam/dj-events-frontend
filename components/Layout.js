// dependencies
import { useRouter } from 'next/router';
// component
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css'

const Layout = ({ title, keywords, description, children }) => {
	const router = useRouter();
  return (
		<div>
			{/* for SEO */}
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Head>
			{/* Header component */}
			<Header />
			{/* showcase component */}
			{router.pathname === '/' && <Showcase />}
			{/* all children component render here */}
			<div className={styles.container}>{children}</div>
			{/* footer component */}
			<Footer />
		</div>
	);
}

export default Layout

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events.',
  keywords: 'music, dj, edm, events'
}