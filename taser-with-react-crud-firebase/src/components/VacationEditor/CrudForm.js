import React from "react"
import "./VacationEditor.css"


const CrudForm = ({ buttonName, displayForm, onSubmit, inputRef1, inputRef2, inputRef3 }) =>

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
            <div className="two columns">
                <input
                    ref={inputRef2}
                    className="u-full-width"
                    type="text"
                    placeholder="nom (4 lettres max)"
                    maxLength = "4"
                    required
                />
            </div>
            <div className="two columns">
                <input
                    ref={inputRef3}
                    className="u-full-width"
                    type="text"
                    placeholder="shortKey"
                    maxLength = "1"
                    required
                />
            </div>
            <div className="four columns">
                <button type="submit"
                    className={buttonName === "Update" ? "submitButton " : null}
                >{buttonName}</button>
            </div>
            <div className="three columns">

            </div>
        </div>
    </form>

export default CrudForm