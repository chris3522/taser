import React from 'react'
import Head from './Head'
import { Match, Link } from "@reach/router"
import * as h from "../../lib/helpers"
import styles from "./Layout.module.css"
const Layout = ({ children, user }) => {
    const { email } = { ...user }
    console.log(email)
    return (
        <div className="container">
            <Head>
                <meta
                    name="description"
                    content="Tableaux de service"
                />
                <title>Tableau de Service</title>
            </Head>
            <header className="header">
                <h2>Tableau de service  {email && (<span>{`/`}</span>)}</h2>
                {email && (<p>{`${h.slugify(email)}`}</p>)}
                {
                    React.Children.map(children, (child, i) => {
                        if (child && child.type === 'header') return child.props.children
                    })
                }
            </header>
            <main>
                {
                    React.Children.map(children, (child, i) => {
                        if (child && child.type !== 'header' && child.type !== 'footer') return child
                    })
                }
                <Match path="/">
                    {props =>
                        props.match ? (
                            <div></div>
                        ) : (
                                <div className={styles.backToHome}>
                                    <Link to="/">
                                        ← Retour à l'accueil
                                </Link>
                                </div>
                            )
                    }
                </Match>
            </main>
            <footer className={styles.footer}>
                {
                    React.Children.map(children, (child, i) => {
                        // Ignore the first child
                        if (child && child.type === 'footer') return child.props.children
                        //console.log(child)
                    })
                }
                {
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <img src="/calendar.svg" alt="calendar Logo" className={styles.logo} />
                    </a>
                }
            </footer>
        </div>
    )
}

export default Layout

