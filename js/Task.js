import React, {useEffect, useState} from "react"
import {getOperations} from "./fetches"
import {Operations} from "./Operations"
import {Operation} from "./Operation"
import {putTask} from "./fetches";

const Task = (props) => {
    const [task, setTask] = useState(props.task)
    const [status, setStatus] = useState(props.task.status)
    const [operations, setOperations] = useState(null)
    const [form, setForm] = useState(false)
    const [taskReload, setTaskReload] = useState(false)

    const blackButtonStyle = {width: '6rem'}

    useEffect(() => {
        if (task.id !== props.task.id) {
            // setTaskReload(!taskReload)
            setTask(props.task)
            // getOperations(props.task.id, setOperations)
        }
    }, [props.task])

    useEffect(() => {
        getOperations(task.id, setOperations)
    }, [taskReload, task])

    const changeTaskStatus = (id, status) => {
        let data = {
            title: props.task.title,
            description: props.task.description,
            status: status
        }
        status === 'closed' && setForm(false)
        putTask(id, data, setStatus)
    }

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{props.task.title}</h5>
                    <h6 className="card-subtitle text-muted">{props.task.description}</h6>
                </div>

                <div>
                    <button className="btn btn-info btn-sm mr-2" hidden={status !== 'open'}
                            onClick={() => setForm(!form)}>
                        Add operation
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>

                    <button className="btn btn-dark btn-sm" hidden={status !== 'open'}
                            onClick={() => changeTaskStatus(props.task.id, 'closed')} style={blackButtonStyle}>
                        Finish
                        <i className="fas fa-archive ml-1"></i>
                    </button>
                    <button className="btn btn-dark btn-sm" hidden={status === 'open'}
                            onClick={() => changeTaskStatus(props.task.id, "open")} style={blackButtonStyle}>
                        Open
                        <i className="fas fa-box-open ml-1"></i>
                    </button>

                    <button className="btn btn-outline-danger btn-sm ml-2" hidden={!operations}
                            onClick={() => props.onRemoveTask(props.task.id)}>
                        <i className="fas fa-trash false"></i>
                    </button>
                </div>
            </div>

            <Operations taskId={props.task.id} form={form} taskReload={taskReload} setTaskReload={setTaskReload}>

                {operations && operations.map((item, index) => <Operation
                    key={index} operation={item} status={status} taskReload={taskReload} setTaskReload={setTaskReload}/>)}

            </Operations>
        </section>
    )
}

export {Task}