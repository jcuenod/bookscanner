let _bookList = JSON.parse(localStorage.getItem("book_list")) || []
let next_uid = Math.max(0, ..._bookList.map(b => b.uid)) + 1
let next_oid = 0
const _observers = []

const save = () => {
	localStorage.setItem("book_list", JSON.stringify(_bookList))
}
const notifyObservers = () => {
	_observers.forEach(o => {
		o.callback(_bookList)
	})
}

const BookListManager = {
	get: uid => {
		return _bookList.filter(b => b.uid === uid)[0] || null
	},
	getAll: () => {
		return _bookList
	},
	add: book => {
		book.uid = next_uid++
		_bookList.push(book)
		save()
		notifyObservers()
	},
	remove: uid => {
		const doomedId = _bookList.findIndex(b => b.uid === uid)
		_bookList.splice(doomedId, 1)
		save()
		notifyObservers()
	},
	markAsSent: uid => {
		const sentId = _bookList.findIndex(b => b.uid === uid)
		_bookList[sentId]["sent"] = true
		save()
		notifyObservers()
	},
	registerObserver: callback => {
		_observers.push({
			oid: next_oid++,
			callback
		})
	},
	unregisterObserver: oid => {
		const doomedId = _observers.findIndex(observer => observer.oid === oid)
		_observers.splice(doomedId, 1)
	}
}
export default BookListManager