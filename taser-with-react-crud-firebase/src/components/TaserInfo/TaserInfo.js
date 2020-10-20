/* src/components/TaserInfo/TaserInfo.js */
import React, { useEffect, useRef } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import "./TaserInfo.css"
import * as api_root from "../../api/info"
import * as h from "../../lib/helpers"

const TaserInfo = ({ user, className }) => {
    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    const taserId = h.slugify(user.email)
    const swrKey = "/admin/taser"
    const { data, error } = useSWR([taserId,swrKey], api_root.getInfo)
    const inputTaserName = useRef(null)
    const inputTaserDesc = useRef(null)
    const inputTaserNumberOfDays = useRef(null)
    const inputTaserNumberOfTasers = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "name":inputTaserName.current.value,
                "desc":inputTaserDesc.current.value,
                "numberOfDays":inputTaserNumberOfDays.current.value,
                "numberOfTasers":inputTaserNumberOfTasers.current.value
            }
            mutate([taserId,swrKey],{...data,...newData })
            api_root.updateInfo(taserId,newData)
            .then((newData) => console.log(newData))
        }
    }

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        const  { name, desc, numberOfDays, numberOfTasers }  = {...data}
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
                            <Link to={`/admin/${taserId}/users`} className="link">
                                <h5><span className="square">></span>{`Gérer les utilisateurs`}</h5>
                            </Link>
                            <Link to={`/admin/${taserId}/vacations`} className="link">
                                <h5><span className="square">></span>{`Gérer les vacations`}</h5>
                            </Link>
                           {/*  <button
                                onClick={() => {
                                    api_root.deleteTaser(taserId).then(() => mutate([taserId,swrKey]))
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