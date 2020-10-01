import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout from '../components/layout'
import { url } from '../lib/env'
//import { getAllTasersInitData } from '../lib/tasers'

export default function Home( { allTasersInitData } ) {
  return (
    <Layout home>
      <Head>
        <title>Tableaux de Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
        <section className={utilStyles.headingMd}>
            <p className={styles.description}>
                Choisir un tableau
            </p>

            <div className={styles.grid}>
                {allTasersInitData.map(({ id,name, desc }) => (           
                    <Link href="/tasers/[id]" as={`/tasers/${id}`} key={id}>
                        <a className={styles.card}>
                            <h3>{ name } &rarr;</h3>
                            <p>{ desc }</p>
                        </a>
                    </Link>
                ))}
            </div>
    </section>


    </Layout>
  )
}
/*
export async function getStaticProps() {
  const allTasersInitData = getAllTasersInitData()
  return {
    props: {
      allTasersInitData
    }
  }
}
*/
export async function getServerSideProps(context) {
    // Fetch data from external API
    //todo:  change  API list to fetch data not in tasers.json but in info.json
    const res = await fetch(`${url}/api/tasers/list`)
    const data = await res.json()
    const allTasersInitData = data.tasers
    // Pass data to the page via props
    return { props: { allTasersInitData } }
}
