import {API_KEY, API_URL} from "./config"

const getTasks = async (successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                Authorization: API_KEY,
            },
        })

        const data = await response.json()

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Error!")
        }
        successCallback(data.data.sort(function (a, b) {
            return new Date(b.addedDate) - new Date(a.addedDate)
        }))
    } catch (err) {
        console.log(err)
    }
}

const putTask = async (taskId, data, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
        })
        successCallback(data.status)
    } catch (err) {
        console.log(err)
    }
}

const postTask = async (data, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
        })
        successCallback()
    } catch (err) {
        console.log(err)
    }
}

const deleteTask = async (taskId, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                Authorization: API_KEY,
            },
        })
        successCallback()
    } catch (err) {
        console.log(err)
    }
}

const getOperations = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
            headers: {
                Authorization: API_KEY,
            },
        })

        let data = await response.json()

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Error!")
        }
        successCallback(data.data.sort(function (a, b) {
            return new Date(a.addedDate) - new Date(b.addedDate)
        }))
    } catch (err) {
        console.log(err)
    }
}

const putOperation = async (operationId, data, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/operations/${operationId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
        })
        successCallback(data.timeSpent)
    } catch (err) {
        console.log(err)
    }
}

const postOperation = async (taskId, data, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}/operations`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
        })
        successCallback()
    } catch (err) {
        console.log(err)
    }
}

const deleteOperation = async (operationId, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/operations/${operationId}`, {
            method: 'DELETE',
            headers: {
                Authorization: API_KEY,
            },
        })
        successCallback()
    } catch (err) {
        console.log(err)
    }
}

export {getTasks, putTask, postTask, deleteTask, getOperations, putOperation, postOperation, deleteOperation}

