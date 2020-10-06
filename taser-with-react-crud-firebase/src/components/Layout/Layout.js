import React from 'react'
import 'skeleton-css/css/skeleton.css'

const name = 'Tableaux de Service'
export const siteTitle = 'tableaux de Service'

const Layout = ({ children, home }) => {
  return ( 
        /*<head>
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="description"
            content="Tableau de service"
            />
        </head>*/
        <div className={ "container" }>
            <header >
            </header>
            <main>{children}</main>
            <footer >
            </footer>
        </div>
  )
}

export default Layout

