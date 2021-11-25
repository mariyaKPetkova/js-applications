import auth from "./auth.js"

export async function jsonRequest(url, method, body, isAuthorized, skipRes) {
    try {
        if (method == undefined) {
            method = 'Get'
        }
        let headers = {}
        if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
            headers['Content-Type'] = 'application/json'
            const options = { headers, method }
            if (body !== undefined) {
                options.body = JSON.stringify(body)
            }
            if (isAuthorized) {
                headers['X-Authorization'] = auth.getAuthToken()
            }
            const response = await fetch(url, options)
            if (!response.ok) {
                const message = await response.text()
                throw new Error(`${response.status}: ${response.statusText}\n${message}`)
            }
            let result = undefined
            if (!skipRes) {

            }
            const res = await response.json()
            return res
        }
    }
    catch (err) {
        alert(err)
    }
}
