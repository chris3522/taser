/* src/components/TaserInfo/TaserInfo.js */
import React, { useState, useEffect } from "react"
import useSWR, { mutate } from "swr"
import { db } from "lib/firebase"
import { Link, navigate } from "@reach/router"
import "./TaserInfo.css"
import * as libInfo from "../../lib/getTaserInfo"
import * as h from "../../lib/helpers"


const TaserInfo = ({ user }) => {
    const [taserName, setTaserName] = useState("")
    const { data, error } = useSWR(h.slugify(user.email), libInfo.getTaserInfo)

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (taserName) {
                            setTaserName("")
                            libInfo.createInfo("NewTaserId", taserName)
                            mutate("NewTaserId")
                        }
                    }}
                    className="new-file-form"
                >
                    <input
                        type="text"
                        placeholder="Your new taser name..."
                        value={taserName}
                        onChange={(e) => setTaserName(e.target.value)}
                    />
                    <button type="submit" className="add-button">
                        Create
          </button>
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