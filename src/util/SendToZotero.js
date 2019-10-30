import generateTemplate from './ZoteroBookItemTemplate'
import SettingsManager from './SettingsManager'

const API_KEY = "api_key"
const USER_ID = "user_id"
const COLLECTION_NAME = "default_collection"
const config = (key) => {
    const value = SettingsManager.get(key)
    if (key === COLLECTION_NAME && !value)
        return "ZBookScanner"

    return value
}

const findOrCreateCollection = async (collectionName) => {
    const url = `https://api.zotero.org/users/${config(USER_ID)}/collections/top`
    const responseObject = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config(API_KEY)}`
        }
    })
    const response = await responseObject.json()

    const collectionMap = Object.keys(response).map(k => ({
        key: response[k].key,
        collectionName: response[k] ?.data ?.name
    }))
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
    const collectionKey = await findOrCreateCollection(config(COLLECTION_NAME))
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