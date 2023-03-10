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

        successCallback(data.data)
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

        const data = await response.json()

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Error!")
        }

        successCallback(data.data)
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
    } catch (err) {
        console.log(err)
    }
}

export {getTasks, getOperations, putOperation, postOperation}

