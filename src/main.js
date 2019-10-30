import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import BookListItem from './components/BookListItem'
import BookDialog from './components/BookDialog'
import SettingsDialog from './components/SettingsDialog'
import IconButton from './components/IconButton'

import BookListManager from './util/BookListManager'
import VideoHelper from './util/VideoHelper'
import { sendBookToZotero, checkForConfig } from './util/SendToZotero'

const COLLECTION_NAME = "ZBookScanner"

const colors = {
	lightNeutral: "#E0E5EC",
	lighterNeutral: "#B8C9D5",
	lightestNeutral: "#B2B9C9",
	accent: "#3A55BE",
	darkNeutral: "#2E3640"
}

const settingsIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M48 34c-8 0-14 6-14 14a14 14 0 1014-14zm0 23a9 9 0 010-18 9 9 0 010 18z" fill="currentColor" /><path d="M54 89H43c-5 0-8-3-8-7v-2l-2 1a7 7 0 01-10 0l-8-8c-2-3-2-7 0-10l2-2h-2c-5 0-8-3-8-7V43c0-4 4-8 8-8h2l-2-1c-2-3-2-8 0-10l8-8a7 7 0 0110 0l2 1v-2c0-4 4-8 8-8h11c2 0 4 1 5 3l2 5v2l2-1a7 7 0 0110 0l8 8a7 7 0 010 10l-2 1h3c2 0 4 1 5 3l2 5v11c0 4-3 7-7 7h-3l2 2c3 3 3 8 0 10l-8 8a7 7 0 01-10 0l-2-2v3c0 4-3 7-7 7zM34 72l2 1 3 2h2v7l2 1h11l1-1v-7l2-1 3-1 2-1 5 5h2l8-8v-2l-5-5 1-2 1-3 1-2h7l1-1V43l-1-2h-7l-1-2-1-3-1-2 5-5v-1l-8-8h-1-1l-5 5-2-1-3-2-2-1v-6l-1-2H43l-2 2v6l-2 1-4 1-1 1-5-4h-1l-8 8v2l4 4-1 2-1 3-1 2h-6l-2 2v11l2 1h6l1 2 1 4 1 2-4 4v2l8 8h1z" fill="currentColor" /></svg>

let observer_id = -1
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showVideoOverlay: false,
			showBookDialog: false,
			showSettingsDialog: false,
			bookDetails: {},
			bookList: BookListManager.getAll()
		}
		observer_id = BookListManager.registerObserver((bookList) => {
			this.setState({ bookList })
		})
	}
	addBookHandler() {
		BookListManager.add(this.state.bookDetails)
		this.setState({ showBookDialog: false })
	}
	removeBookHandler(uid) {
		BookListManager.remove(uid)
	}
	async sendToZotero(uid) {
		const { title, authors, publisher, date } = BookListManager.get(uid)
		if (checkForConfig()) {
			const success = sendBookToZotero({ title, authors, publisher, date })
			if (success) {
				BookListManager.markAsSent(uid)
			}
			else {
				alert("Failed to send to zotero for some reason...")
			}
		}
		else {
			alert("You must set a user ID and an API key to send a book to you Zotero library.")
		}
	}
	scanClickHandler() {
		this.setState({ showVideoOverlay: true })
		VideoHelper.scanItem(this.scanItemCallback.bind(this))
	}
	scanItemCallback(details) {
		let bookDetails = {}
		if (details.totalItems > 0) {
			const title = details.items[0] ?.volumeInfo ?.title
			const subtitle = details.items[0] ?.volumeInfo ?.subtitle
			const authors = details.items[0] ?.volumeInfo ?.authors || []
			const date = details.items[0] ?.volumeInfo ?.publishedDate.replace(/(.*)(\d{4})(.*)/, '$2')
			const publisher = details.items[0] ?.volumeInfo ?.publisher
			const imgSrc = details.items[0] ?.volumeInfo ?.imageLinks ?.smallThumbnail
			const isbn = details.isbnSearch
			bookDetails = { title, subtitle, authors, date, publisher, imgSrc, isbn }
		}
		this.setState({ showVideoOverlay: false, showBookDialog: true, bookDetails })
	}

	hideSettingsDialog() {
		this.setState({ showSettingsDialog: false })
	}

	render() {
		return (
			<div className="app-wrapper">
				<div className="section-header">
					<h1 style={{ color: colors.darkNeutral }}>ZBOOKScanner</h1>
				</div>
				<div className="section-content">
					<ul className="bookList">
						{this.state.bookList.map(b =>
							<BookListItem key={b.uid} {...b}
								onDelete={() => this.removeBookHandler(b.uid)}
								onSend={() => this.sendToZotero(b.uid)} />)
						}
					</ul>
				</div>
				<div className="section-footer">
					<div>
						<div className="button" onClick={this.scanClickHandler.bind(this)}>
							SCAN
						</div>
					</div>
					<div>
						<IconButton onClick={() => { this.setState({ showSettingsDialog: true }) }}
							classes={["settingsIcon"]}
							icon={settingsIcon} />
					</div>
				</div>
				<video id="video" style={{ pointerEvents: (this.state.showVideoOverlay ? "auto" : "none") }} className={this.state.showVideoOverlay ? "show" : ""} />
				<BookDialog
					addBookHandler={this.addBookHandler.bind(this)}
					visible={this.state.showBookDialog}
					bookDetails={this.state.bookDetails} />
				<SettingsDialog
					closeDialog={this.hideSettingsDialog.bind(this)}
					visible={this.state.showSettingsDialog} />

			</div>)
	}
}


const mainNode = document.querySelector("#app")
ReactDOM.render(<App />, mainNode)
