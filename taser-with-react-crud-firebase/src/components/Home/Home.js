import React, { useEffect, useRef, useState } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import * as api_root_tasers from "../../api/tasers"



const Home = ({ className }) => {

    const swrKey = `/tasers`
    const { data, error } = useSWR([swrKey], api_root_tasers.getTasers)
    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
       console.log(data)
        return (
            <div className={`${className}`}>
                <h1>Tableau</h1>
                <ul>
                {data.map((taser) => {
                    console.log(taser)
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
}

export default Home