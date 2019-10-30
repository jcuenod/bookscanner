const allowed_keys = ["api_key", "user_id", "default_collection"]

const validateKey = key => {
    if (!allowed_keys.includes(key)) {
        throw "You are trying to look up a key that ZBookScanner does not expect to exist"
    }
}

const SettingsManager = {
    get: key => {
        validateKey(key)
        const settings = JSON.parse(localStorage.getItem("settings"))
        return settings ?.[key] || ""
    },
    getAll: () => {
        return JSON.parse(localStorage.getItem("settings")) || { user_id: "", api_key: "", default_collection: "" }
    },
    set: (key, value) => {
        validateKey(key)
        const settings = JSON.parse(localStorage.getItem("settings")) || {}
        settings[key] = value
        localStorage.setItem("settings", JSON.stringify(settings))
    }
}
export default SettingsManager