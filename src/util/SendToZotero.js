import generateTemplate from './ZoteroBookItemTemplate'
import SettingsManager from './SettingsManager'
const { API_KEY, USER_ID, DEFAULT_COLLECTION } = SettingsManager

const config = key => {
    const value = SettingsManager.get(key)
    if (key === DEFAULT_COLLECTION && !value)
        return "ZBookScanner"

    return value
}

const getUserID = async () => {
	if (config(USER_ID) && config(API_KEY) === localStorage.getItem("user_id_for")) {
		return
	}
	const responseObject = await fetch(`https://api.zotero.org/keys/${config(API_KEY)}`)
	const response = await responseObject.json()
	SettingsManager.set(USER_ID, response.userID)
	localStorage.setItem("user_id_for", config(API_KEY))
}

const findOrCreateCollection = async (collectionName) => {
    const url = `https://api.zotero.org/users/${config(USER_ID)}/collections/top`
	console.log(config(API_KEY))
    const responseObject = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config(API_KEY)}`
        }
    })
    const response = await responseObject.json()

    const collectionMap = Object.keys(response).map(k => {
        const r = response[k]
        let collectionName = null
        if ("data" in r && "name" in r.data) {
            collectionName = r.data.name
        }
        return {
            key: r.key,
            collectionName
        }
    })
    const matchingCollection = collectionMap.find(c => c.collectionName === collectionName)
    if (matchingCollection) {
        return matchingCollection.key
    }
    return createCollectionAndReturnKey(collectionName)
}

const createCollectionAndReturnKey = async (collectionName) => {
    // CREATE COLLECTION IF IT DOES NOT EXIST
    const url = `https://api.zotero.org/users/${config(USER_ID)}/collections`
    const responseObject = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config(API_KEY)}`
        },
        body: JSON.stringify([
            {
                "name": collectionName //"ZBookScanner"
            }
        ])
    })
    const response = await responseObject.json()
    return response.success[0]
}

const sendBookToZotero = async ({ title, authors, publisher, date }) => {
	getUserID()
    const collectionKey = await findOrCreateCollection(config(DEFAULT_COLLECTION))
    const zoteroBookItem = generateTemplate({ title, authors, publisher, date, collectionKey })
    const url = `https://api.zotero.org/users/${config(USER_ID)}/items`
    const responseObject = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config(API_KEY)}`
        },
        body: JSON.stringify(zoteroBookItem)
    })
    const response = await responseObject.json()

    // the failed has length 0 if success...
    return Object.keys(response.failed).length === 0
}

const checkForConfig = () => {
    const { user_id, api_key } = SettingsManager.getAll()
    return !!(user_id && api_key)
}

export { sendBookToZotero, checkForConfig }
