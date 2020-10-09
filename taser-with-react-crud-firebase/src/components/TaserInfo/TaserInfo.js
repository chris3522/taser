/* src/components/TaserInfo/TaserInfo.js */
import React, { useState, useEffect } from "react"
import useSWR, { mutate } from "swr"
import { db } from "lib/firebase"
import { Link, navigate } from "@reach/router"
import "./TaserInfo.css"
import * as libInfo from "../../lib/getTaserInfo"
import * as h from "../../lib/helpers"
//A faire
//utiliser useRef
//ajouter des inputs
//css form reutilisable

const TaserInfo = ({ user, className }) => {
    const [taserName, setTaserName] = useState("")
    const { data, error } = useSWR(h.slugify(user.email), libInfo.getTaserInfo)

    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div className={`${className}`}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (taserName) {
                            setTaserName("")
                            libInfo.createInfo("NewTaserId", taserName)
                            mutate("NewTaserId")
                        }
                    }}

                >
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Le nom de votre tableau de service..."
                        value={taserName}
                        onChange={(e) => setTaserName(e.target.value)}
                    />
                    <button type="submit">Create</button>
                </form>
                <ul className="files-list">
                    {data.map((info) => {
                        return (
                            <li key={info.id} className="file">
                                <Link to={`/user/NewTaserId/editor/${info.id}`} className="link">
                                    {info.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default TaserInfo