import React  from "react"
import useSWR from "swr"
import * as api_root_tasers from "../../api/tasers"
import { Link } from 'components'
import { navigate } from "@reach/router"
import basePath from "../../lib/env"

const BASE = basePath.BASE

const Home = ({ className, user }) => {
    const swrKey = `/tasers`
    const { data, error } = useSWR([swrKey], api_root_tasers.getTasers)
    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else if (user) {
        return (
            <div className={`${className}`}>
                <h4>Liste des tableaux</h4>
                <ul>
                {data.map((taser) => {
                    return taser.name && (
                    <li key={taser.id}>
                        <Link to={`/taser/${taser.id}`} className="link">
                            {taser.name}
                        </Link>
                    </li>
                    )}
                    )
                }
                </ul>
            </div>
        )
    }
    else {
        navigate(`${BASE}/login`)
        return null
    }
}

export default Home