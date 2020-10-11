/* src/components/TaserInfo/TaserInfo.js */
import React, { useEffect, useRef } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import "./TaserInfo.css"
import * as crudTaser from "../../lib/getTaserInfo"
import * as h from "../../lib/helpers"

const TaserInfo = ({ user, className }) => {
    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    const taserId = h.slugify(user.email)
    const { data, error } = useSWR(taserId, crudTaser.getTaserInfo)

    const inputTaserName = useRef(null)
    const inputTaserDesc = useRef(null)
    const inputTaserNumberOfDays = useRef(null)
    const inputTaserNumberOfTasers = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            crudTaser.createInfo(
                taserId,
                inputTaserName.current.value,
                inputTaserDesc.current.value,
                inputTaserNumberOfDays.current.value,
                inputTaserNumberOfTasers.current.value
            )
            mutate(taserId)
        }
    }

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        const { name, desc, numberOfDays, numberOfTasers } = {...data[0]}
        return (
            <div className={`${className}`}>
                <form onSubmit={handleSubmit}>
                    <label>id</label>
                    <input
                        className="u-full-width"
                        type="text"
                        value={taserId}
                        readOnly={true}
                    />
                    <label>Titre</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="*Titre du tableau..."
                        required
                        defaultValue={name}
                        ref={inputTaserName}
                    />
                    <label>Description</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Description courte de votre tableau..."
                        defaultValue={desc}
                        ref={inputTaserDesc}
                    />
                    <label>Longueur d'un tableau (7 jours par défaut)</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Longueur d'un tableau (en jours)..."
                        defaultValue={numberOfDays}
                        ref={inputTaserNumberOfDays}
                    />
                    <label>Nombre de taleaux affichés sur une page (4 par défaut)</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Nombre de taleaux affichés sur une page..."
                        defaultValue={numberOfTasers}
                        ref={inputTaserNumberOfTasers}
                    />
                    <button type="submit">Create or Update</button>
                </form>
                <div className={`${className}`}>
                    {name && (
                        <div key={taserId}>    
                            <Link to={`/admin/tasers/${taserId}`} className="link">
                                <h5><span className="square">></span>{`${taserId} - ${name} - ${desc}`}</h5>
                            </Link>
                           {/*  <button
                                onClick={() => {
                                    crudTaser.deleteTaser(taserId).then(() => mutate(taserId))
                                }}
                                className=""
                            >
                                x
                            </button> */}
                        </div>)}                 
                </div>
            </div>
        )
    }
}

export default TaserInfo