import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import BookListItem from './components/BookListItem'
import BookDialog from './components/BookDialog'

import BookListManager from './util/BookListManager'
import VideoHelper from './util/VideoHelper'

const colors = {
	lightNeutral: "#E0E5EC",
	lighterNeutral: "#B8C9D5",
	lightestNeutral: "#B2B9C9",	
	accent: "#3A55BE",
	darkNeutral: "#2E3640"
}

let observer_id = -1
class App extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			showVideoOverlay: false,
			showBookDialog: false,
			bookDetails: {},
			bookList: BookListManager.getAll()
		}
		observer_id = BookListManager.registerObserver((bookList) => {
			this.setState({bookList})
		})
	}
	addBookHandler() {
		const { title, subtitle, author, isbn } = this.state.bookDetails
		BookListManager.add(this.state.bookDetails)
		this.setState({showBookDialog: false})
	}
	scanClickHandler() {
		this.setState({showVideoOverlay: true})
		VideoHelper.scanItem(this.scanItemCallback.bind(this))
	}
	scanItemCallback(details) {
		let bookDetails = {}
		if (details.totalItems > 0) {
			const title = details.items[0]?.volumeInfo?.title
			const subtitle = details.items[0]?.volumeInfo?.subtitle
			const author = details.items[0]?.volumeInfo?.authors.join(", ")
			const date = details.items[0]?.volumeInfo?.publishedDate.replace(/(.*)(\d{4})(.*)/,'$2')
			const publisher = details.items[0]?.volumeInfo?.publisher
			const imgSrc = details.items[0]?.volumeInfo?.imageLinks?.smallThumbnail
			const isbn = details.isbnSearch
			bookDetails = { title, subtitle, author, date, publisher, imgSrc, isbn }
		}
		this.setState({showVideoOverlay: false, showBookDialog: true, bookDetails})
	}

	render(){
		return (
		<div className="app-wrapper">
			<div className="section-header">
				<h1 style={{ color: colors.darkNeutral }}>ZBOOKScanner</h1>
			</div>
			<div className="section-breadcrumb">
			breadcrumb...
			</div>
			<div className="section-content">
				<ul>
					{this.state.bookList.map(b => <BookListItem key={b.uid} {...b} />)}
				</ul>
			</div>
			<div className="section-footer" style={{ textAlign: "center" }}>
				<div className="button" onClick={this.scanClickHandler.bind(this)}>
					SCAN
				</div>
			</div>
			<video id="video" style={{pointerEvents: (this.state.showVideoOverlay ? "auto" : "none")}} className={this.state.showVideoOverlay ? "show" : ""} />
			<BookDialog
				addBookHandler={this.addBookHandler.bind(this)}
				visible={this.state.showBookDialog}
				bookDetails={this.state.bookDetails} />
		</div>)
	}
}


const mainNode = document.querySelector("#app")
ReactDOM.render(<App />, mainNode)
