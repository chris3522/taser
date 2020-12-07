import React from 'react'
import Head from './Head'
import { Match, navigate } from "@reach/router"
import { Link } from 'components'
import * as h from "../../lib/helpers"
import styles from "./Layout.module.css"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import { ReactComponent as Logo } from './calendar.svg'
import basePath from "../../lib/env"

const BASE = basePath.BASE

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
                <Match path={`${BASE}/`}>
                    {props =>
                        props.match || props.location.pathname === `${BASE}/login` ? (
                            <div></div>
                        ) : (
                                <div className={styles.backToHome}>
                                    <Link to="/">
                                        ← Liste des tableaux
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

                <Link to="/login">
                    <Logo alt="calendar Logo" className={styles.logo} />
                </Link>
                <Icon
                    name="settings"
                    theme="light"
                    size="small"
                    onClick={() => navigate(`${BASE}/admin/taser`)}
                />
            </footer>
        </div>
    )
}

export default Layout

