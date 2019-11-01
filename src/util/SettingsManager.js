const allowed_keys = ["api_key", "user_id", "default_collection"]

const validateKey = key => {
    if (!allowed_keys.includes(key)) {
        throw "You are trying to look up a key that ZBookScanner does not expect to exist"
    }
}

const fetchAndParseSettings = () =>
    JSON.parse(localStorage.getItem("settings")) || { user_id: "", api_key: "", default_collection: "zbookscanner" }


const SettingsManager = {
    API_KEY: "api_key",
    USER_ID: "user_id",
    DEFAULT_COLLECTION: "default_collection",
    get: key => {
        validateKey(key)
        const settings = fetchAndParseSettings()
        return settings ?.[key]
    },
    getAll: () => {
        return fetchAndParseSettings()
    },
    set: (key, value) => {
        validateKey(key)
        const settings = fetchAndParseSettings()
        settings[key] = value
        localStorage.setItem("settings", JSON.stringify(settings))
    }
}
export default SettingsManager