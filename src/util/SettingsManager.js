const API_KEY = "api_key"
const USER_ID = "user_id"
const DEFAULT_COLLECTION = "default_collection"
const allowed_keys = [API_KEY, USER_ID, DEFAULT_COLLECTION]

const validateKey = key => {
    if (!allowed_keys.includes(key)) {
        throw "You are trying to look up a key that ZBookScanner does not expect to exist"
    }
}

const fetchAndParseSettings = () =>
    JSON.parse(localStorage.getItem("settings")) || { user_id: "", api_key: "", default_collection: "zbookscanner" }


const SettingsManager = {
	API_KEY, USER_ID, DEFAULT_COLLECTION,
    get: key => {
        validateKey(key)
        const settings = fetchAndParseSettings()
        return key in settings ? settings[key] : ""
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
