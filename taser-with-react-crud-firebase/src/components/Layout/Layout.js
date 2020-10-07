import React from 'react'
import Head from './Head'

const Layout = ({ children, home }) => {
  return ( 
        <div className="container">
            <Head>
                <meta
                name="description"
                content="Tableau de service"
                />
                <title>Tableau de Service</title>
            </Head>
            <header >
                <h1>Tableau de service</h1>
            </header>
            <main>{children}</main>
            <footer >
            </footer>
        </div>
  )
}

export default Layout

