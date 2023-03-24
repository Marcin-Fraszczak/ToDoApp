import React, {useEffect, useState} from "react"
import {createRoot} from "react-dom/client"
import {getTasks, deleteTask} from "./fetches"
import {Task} from "./Task"
import {NewTask} from "./NewTask";

const App = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks(setTasks)
    }, [])

    const onRemoveTask = (id) => {
        deleteTask(id, setTasks)
    }

    return (
        <>
            <NewTask setTasks={setTasks}/>
            {tasks.map(item =>
                <Task key={item.id} task={item} onRemoveTask={onRemoveTask}/>)}
        </>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
