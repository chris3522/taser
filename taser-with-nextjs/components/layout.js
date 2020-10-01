import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Tableaux de Service'
export const siteTitle = 'tableaux de Service'

function Layout({ children, home }) {
  return (
    <div className={ styles.container } >
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="description"
            content="Tableau de service"
            />
        </Head>
        <header className={styles.header}>
            {home ? (
                <>
                    <img
                    src="/logo.png"
                    className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                    alt={name}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            ):(
                <>

                </>
            )}
        </header>
        <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Retour à l'accueil</a>
                    </Link>
                </div>
            )}
        <footer className={styles.footer}>
            <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            >
            
            <img src="/calendar.svg" alt="calendar Logo" className={styles.logo} />
            </a>
        </footer>
        
    </div>
  )
}

export default Layout
