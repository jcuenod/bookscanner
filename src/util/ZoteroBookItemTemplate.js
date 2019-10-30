export default ({ title, authors, publisher, date, collectionKey }) => ([{
    "itemType": "book",
    title,
    "creators": authors.map(author => ({
        "creatorType": "author",
        "name": author,
    })),
    "abstractNote": "entry created by zbookscanner",
    publisher,
    date,
    "tags": [],
    "collections": [collectionKey],
    "relations": {}
}])