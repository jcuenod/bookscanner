import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BookDialog from './components/BookDialog'
// import Scanner from './components/Scanner'

import VideoHelper from './util/VideoHelper'

const colors = {
	lightNeutral: "#E0E5EC",
	lighterNeutral: "#B8C9D5",
	lightestNeutral: "#B2B9C9",	
	accent: "#3A55BE",
	darkNeutral: "#2E3640"
}

class App extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			showVideoOverlay: false,
			showBookDialog: false,
			bookDetails: {},
			bookList: []
		}
	}
	addBookHandler() {
		const bookList = this.state.bookList.slice(0)
		const {title, subtitle, author, isbn} = this.state.bookDetails
		bookList.push(this.state.bookDetails)
		this.setState({showBookDialog: false, bookList})
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
			const date = details.items[0]?.volumeInfo?.publishedDate.replace(/(\d{4})/,'$1')
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
					{this.state.bookList.map(b => <li>{b.title}<br />{b.subtitle}<br />{b.author}<br />{b.isbn}</li>)}
				</ul>
			</div>
			<div className="section-footer" style={{ textAlign: "center" }}>
				<div className="button" onClick={this.scanClickHandler.bind(this)}>
					SCAN
				</div>
			</div>
			<video id="video" className={this.state.showVideoOverlay ? "show" : ""} />
			{/* this.state.showVideoOverlay ? <Scanner onDetected={d => console.log(d)} /> : null */}
			<BookDialog
				addBookHandler={this.addBookHandler.bind(this)}
				visible={this.state.showBookDialog}
				bookDetails={this.state.bookDetails} />
		</div>)
	}
}


const mainNode = document.querySelector("#app")
ReactDOM.render(<App />, mainNode)
