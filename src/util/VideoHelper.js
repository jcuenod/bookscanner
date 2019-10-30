// import { BrowserQRCodeReader } from '@zxing/library'

let selected_device_id = undefined
const barcodeReader = new ZXing.BrowserBarcodeReader()

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

const scanItem = async (callback) => {
	console.log("scanning!")
	console.log(selected_device_id)
	let result = await barcodeReader.decodeOnceFromVideoDevice(selected_device_id, 'video')
	while (!/\d{13}/.test(result.text)) {
		alert("failed to get a real reading (trying to try again)")
		result = await barcodeReader.decodeOnceFromVideoDevice(selected_device_id, 'video')
	}
	const bookData = await doIsbnSearch(result.text)
	bookData.isbnSearch = result.text
	callback(bookData)
	barcodeReader.reset()
	// .catch(err => {
	// 	console.error(err)
	// })
}
const VideoHelper = {
	scanItem: params => scanItem(params)
}
export default VideoHelper
