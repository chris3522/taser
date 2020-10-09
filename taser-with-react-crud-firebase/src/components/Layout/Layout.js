import React from 'react'
import Head from './Head'

const Layout = ({ children, home }) => {
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
                <h2>Tableaux de service</h2>
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
            </main>
            <footer >
                {
                    React.Children.map(children, (child, i) => {
                        // Ignore the first child
                        if (child && child.type === 'footer') return child.props.children
                        //console.log(child)
                    })
                }
            </footer>
        </div>
    )
}

export default Layout

