import React from "react"
import "./DesiderataEditor.css"


const CrudForm = ({ buttonName, displayForm, onSubmit, inputRef1, inputRef2, inputRef3, inputRef4 }) =>

    <form className={displayForm} onSubmit={onSubmit}>
        <div className="row">
            <div className={`one columns`} >
                <input
                    ref={inputRef1}
                    className="u-full-width"
                    placeholder="id"
                    type="hidden"
                    readOnly
                />
            </div>
            <div className="four columns">
                <input
                    ref={inputRef2}
                    className="u-full-width"
                    type="text"
                    placeholder="nom (10 lettres max)"
                    maxLength="10"
                    required
                />
            </div>
            <div className="one columns">
                <input
                    ref={inputRef3}
                    className="u-full-width"
                    type="text"
                    placeholder="shortKey"
                    maxLength="1"
                    readOnly
                    defaultValue="x"
                />
            </div>
            <div className="two columns">
                <input
                    ref={inputRef4}
                    className="u-full-width"
                    type="color"
                />
            </div>
            <div className="two columns">
                <button type="submit"
                    className={buttonName === "Update" ? "submitButton " : null}
                >{buttonName}</button>
            </div>
            <div className="two columns">

            </div>
        </div>
    </form>

export default CrudForm