import React, {useState, useEffect} from "react"
import {postTask} from "./fetches";
import {errorStyle, errorMsg, validateString} from "./config";

const NewTask = (props) => {
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState(false)
    const [formError, setFormError] = useState(false)

    useEffect(() => {
        title && setTitleError(!validateString(title, 2))
        description && setDescriptionError(!validateString(description, 2))
    }, [title, description])

    useEffect(() => {
        if (description && !descriptionError && title && !titleError) {
            setFormError(false)
        }
    }, [titleError, descriptionError])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && !titleError && description && !descriptionError) {
            const data = {
                title: e.target.title.value,
                description: e.target.description.value,
                status: 'open'
            }
            setTitle('')
            setDescription('')
            postTask(data, () => props.setAppReload(!props.appReload))
            e.target.title.focus()
        } else {
            setFormError(true)
        }
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <div className='input-group'>
                            <input type='text'
                                   className="form-control"
                                   name='title'
                                   value={title}
                                   placeholder='Title'
                                   onChange={e => setTitle(e.target.value)}/>
                            <div className='input-group-append' style={errorStyle}>{titleError ? errorMsg : ''}</div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className='input-group'>
                        <input type='text'
                               className="form-control"
                               name='description'
                               value={description}
                               placeholder='Description'
                               onChange={e => setDescription(e.target.value)}/>
                        <div style={errorStyle}>{descriptionError ? errorMsg : ''}</div>
                        </div>
                    </div>
                    <button className="btn btn-info" disabled={formError}>
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                    <div style={errorStyle}>{formError ? 'Please correct your inputs' : ''}</div>
                </form>
            </div>
        </div>
    )
}

export {NewTask}