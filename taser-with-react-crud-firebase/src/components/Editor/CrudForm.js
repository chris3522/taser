import React from "react"
import "./Editor.css"


 const CrudForm = ({buttonName, displayForm, onSubmit, inputRef1, inputRef2}) =>
 
        <form className={displayForm} onSubmit={onSubmit}>
            <div className="row">
                <div className={`one columns`} >
                    <input
                        ref={inputRef1}
                        className="u-full-width"
                        placeholder="id"
                        type="text"
                        readOnly
                    />
                </div>
                <div className="four columns">
                    <input
                        ref={inputRef2}
                        className="u-full-width"
                        type="text"
                        placeholder="Ajouter le nom d'un agent au tableau"
                        required
                    />
                </div>
                <div className="four columns">
                    <button type="submit">{buttonName}</button>
                </div>
                <div className="three columns">
                    
                </div>
            </div>
        </form>

export default CrudForm