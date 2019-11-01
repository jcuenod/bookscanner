let _booklist = JSON.parse(localStorage.getItem("book_list")) || []
let next_uid = Math.max(0, ..._booklist.map(b => b.uid)) + 1
let next_oid = 0
const _observers = []

const save = () => {
	localStorage.setItem("booklist", JSON.stringify(_booklist))
}
const notifyObservers = () => {
	_observers.forEach(o => {
		o.callback(_booklist)
	})
}

const BooklistManager = {
	get: uid => {
		return _booklist.filter(b => b.uid === uid)[0] || null
	},
	getAll: () => {
		return _booklist
	},
	add: book => {
		book.uid = next_uid++
		_booklist.push(book)
		save()
		notifyObservers()
	},
	remove: uid => {
		const doomedId = _booklist.findIndex(b => b.uid === uid)
		_booklist.splice(doomedId, 1)
		save()
		notifyObservers()
	},
	markAsSent: uid => {
		const sentId = _booklist.findIndex(b => b.uid === uid)
		_booklist[sentId]["sent"] = true
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
export default BooklistManager