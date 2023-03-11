import React, {useEffect, useState} from "react"
import {postOperation} from "./fetches";
import {errorMsg, errorStyle, validateString} from "./config";

const Operations = (props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!props.form) {
            setError(false)
            setValue('')
        }
        value && setError(!validateString(value, 5))
    }, [value, props.form])

    const handleSubmit = (e) => {
        e.preventDefault()
        let description = e.target.name.value
        if (validateString(description, 5)) {
            setValue('')
            setError(false)
            const data = {
                description: description,
                timeSpent: 0,
            }
            postOperation(props.taskId, data, () => props.setTaskReload(!props.taskReload))
        } else {
            setError(true)
        }
    }

    return (
        <>
            <div className="card-body">
                <form hidden={!props.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-group">
                        <input type="text"
                               name='name'
                               className="form-control"
                               placeholder="Operation description"
                               value={value}
                               onChange={e => setValue(e.target.value)}/>
                        <div className="input-group-append">
                            <button className="btn btn-info">
                                Add
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                        </div>
                        <div className='input-group-append' style={errorStyle}>{error ? errorMsg : ''}</div>
                    </div>

                </form>

            </div>

            <ul className="list-group list-group-flush">
                {props.children}
            </ul>
        </>
    )
}

export {Operations}