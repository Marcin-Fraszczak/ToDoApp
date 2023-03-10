const API_KEY = '2d736cfb-94d9-4872-b7d8-49d5642d88ed'
const API_URL = `https://todo-api.coderslab.pl/api`

const getAPIKey = async (successCallback) => {
    try {
        const response = await fetch('https://todo-api.coderslab.pl/apikey/create')
        const data = await response.json()
        if (data.error || typeof successCallback !== "function") {
            throw new Error("Error!");
        }
        successCallback(data.data.apiKey)
    } catch (err) {
        console.log(err)
    }
}

export {API_KEY, API_URL, getAPIKey}