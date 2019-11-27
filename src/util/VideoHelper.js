import BooklistManager from './BooklistManager'

let selected_device_id = undefined

// const barcodeFormatArray = Object.keys(ZXing.BarcodeFormat)
// const codeHints = ["CODE_128", "EAN_13"].map(code => barcodeFormatArray.findIndex(v => v === code))
const hints = new Map()
const formats = [
	ZXing.BarcodeFormat.CODE_128,
	ZXing.BarcodeFormat.EAN_13
]
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats)
const barcodeReader = new ZXing.BrowserBarcodeReader(500, hints)

barcodeReader.getVideoInputDevices().then((videoInputDevices) => {
	console.log(videoInputDevices)
	const sourceSelect = document.getElementById('sourceSelect')
	selected_device_id = videoInputDevices[videoInputDevices.length - 1].deviceId
	// 	/* What follows is irrelevant...*/
	// 	// if (videoInputDevices.length > 1) {
	// 	//     videoInputDevices.forEach((element) => {
	// 	//         const sourceOption = document.createElement('option')
	// 	//         sourceOption.text = element.label
	// 	//         sourceOption.value = element.deviceId
	// 	//         sourceSelect.appendChild(sourceOption)
	// 	//     })

	// 	//     sourceSelect.onchange = () => {
	// 	//         selected_device_id = sourceSelect.value;
	// 	//     }

	// 	//     const sourceSelectPanel = document.getElementById('sourceSelectPanel')
	// 	//     sourceSelectPanel.style.display = 'block'
	// 	// }
	// 	console.log(selected_device_id)
})

const processBookDetails = bookDetails => {
	if (bookDetails.totalItems > 0) {
		const title = bookDetails.items[0] ?.volumeInfo ?.title
		const subtitle = bookDetails.items[0] ?.volumeInfo ?.subtitle
		const authors = bookDetails.items[0] ?.volumeInfo ?.authors || []
		const date = bookDetails.items[0] ?.volumeInfo ?.publishedDate.replace(/(.*)(\d{4})(.*)/, '$2')
		const publisher = bookDetails.items[0] ?.volumeInfo ?.publisher
		const imgSrc = bookDetails.items[0] ?.volumeInfo ?.imageLinks ?.smallThumbnail
		const isbn = bookDetails.isbnSearch
		bookDetails = { title, subtitle, authors, date, publisher, imgSrc, isbn }
		BooklistManager.add({
			title,
			subtitle,
			authors,
			date,
			publisher,
			imgSrc,
			isbn
		})
	}
}

const url = (isbn) => `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
const doIsbnSearch = async (isbn) => {
	console.log(isbn)
	const response = await fetch(url(isbn))
	const json = await response.json()
	return json
	// .catch(err => {
	// 	console.err("couldn't fetch from google:\n", err)
	// })
}

let is_scanning = false
const scanItem = async (callback) => {
	is_scanning = true
	console.log("scanning!")
	console.log(selected_device_id)
	let result = await barcodeReader.decodeOnceFromVideoDevice(selected_device_id, 'video')
	while (!/\d{13}/.test(result.text) && is_scanning) {
		alert("failed to get a real reading (trying to try again)")
		result = await barcodeReader.decodeOnceFromVideoDevice(selected_device_id, 'video')
	}
	if (!is_scanning) {
		return
	}

	const bookData = await doIsbnSearch(result.text)
	bookData.isbnSearch = result.text
	processBookDetails(bookData)
	// barcodeReader.reset()
	callback()
	// .catch(err => {
	// 	console.error(err)
	// })
}
const reset = () => {
	is_scanning = false
	barcodeReader.reset()
	barcodeReader.hints = hints
	console.log("Reset barcode reader")
}
const VideoHelper = {
	scanItem,
	reset
}
export default VideoHelper
