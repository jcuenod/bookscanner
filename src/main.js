import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Fab
} from '@material-ui/core'
import { AddAPhoto as AddAPhotoIcon, Settings as SettingsIcon } from '@material-ui/icons'

import BookList from './components/BookList'
// import BookDialog from './components/BookDialog'
import SettingsDialog from './components/SettingsDialog'
import ScanDialog from './components/ScanDialog'
// import IconButton from './components/IconButton'

import BooklistManager from './util/BooklistManager'
// import { sendBookToZotero, checkForConfig } from './util/SendToZotero'

// const COLLECTION_NAME = "ZBookScanner"

// const colors = {
// 	lightNeutral: "#E0E5EC",
// 	lighterNeutral: "#B8C9D5",
// 	lightestNeutral: "#B2B9C9",
// 	accent: "#3A55BE",
// 	darkNeutral: "#2E3640"
// }

// import bookVector from '/assets/books.svg'
// import { callbackify } from 'util'
// const settingsIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M48 34c-8 0-14 6-14 14a14 14 0 1014-14zm0 23a9 9 0 010-18 9 9 0 010 18z" fill="currentColor" /><path d="M54 89H43c-5 0-8-3-8-7v-2l-2 1a7 7 0 01-10 0l-8-8c-2-3-2-7 0-10l2-2h-2c-5 0-8-3-8-7V43c0-4 4-8 8-8h2l-2-1c-2-3-2-8 0-10l8-8a7 7 0 0110 0l2 1v-2c0-4 4-8 8-8h11c2 0 4 1 5 3l2 5v2l2-1a7 7 0 0110 0l8 8a7 7 0 010 10l-2 1h3c2 0 4 1 5 3l2 5v11c0 4-3 7-7 7h-3l2 2c3 3 3 8 0 10l-8 8a7 7 0 01-10 0l-2-2v3c0 4-3 7-7 7zM34 72l2 1 3 2h2v7l2 1h11l1-1v-7l2-1 3-1 2-1 5 5h2l8-8v-2l-5-5 1-2 1-3 1-2h7l1-1V43l-1-2h-7l-1-2-1-3-1-2 5-5v-1l-8-8h-1-1l-5 5-2-1-3-2-2-1v-6l-1-2H43l-2 2v6l-2 1-4 1-1 1-5-4h-1l-8 8v2l4 4-1 2-1 3-1 2h-6l-2 2v11l2 1h6l1 2 1 4 1 2-4 4v2l8 8h1z" fill="currentColor" /></svg>

let observer_id = -1
class App extends React.Component {
	constructor(props) {
		super(props)
		this.menuButton = React.createRef()
		this.state = {
			showScanDialog: false,
			// showBookDialog: false,
			showSettingsDialog: false,
			booklist: BooklistManager.getAll()
		}
		observer_id = BooklistManager.registerObserver((booklist) => {
			this.setState({ booklist })
		})
	}
	// async sendToZotero(uid) {
	// 	const { title, authors, publisher, date } = BooklistManager.get(uid)
	// 	if (checkForConfig()) {
	// 		const success = sendBookToZotero({ title, authors, publisher, date })
	// 		if (success) {
	// 			BooklistManager.markAsSent(uid)
	// 		}
	// 		else {
	// 			alert("Failed to send to zotero for some reason...")
	// 		}
	// 	}
	// 	else {
	// 		alert("You must set a user ID and an API key to send a book to you Zotero library.")
	// 	}
	// }

	// hideSettingsDialog() {
	// 	this.setState({ showSettingsDialog: false })
	// }

	render() {
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" style={{ flexGrow: 1 }}>
							ZBookScanner
						</Typography>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={() => { this.setState({ showSettingsDialog: true }) }}
							color="inherit">
							<SettingsIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<BookList books={this.state.booklist} />
				<SettingsDialog
					open={this.state.showSettingsDialog}
					handleClose={() => this.setState({ showSettingsDialog: false })}
				/>
				<ScanDialog
					open={this.state.showScanDialog}
					handleClose={() => this.setState({ showScanDialog: false })}
				/>
				<Fab color="primary"
					aria-label="add"
					onClick={() => this.setState({ showScanDialog: true })}
					style={{ position: "absolute", bottom: "2em", right: "2em" }}>
					<AddAPhotoIcon />
				</Fab>
			</div>
		)
	}
}


{/* 
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

<BookDialog
	addBookHandler={this.addBookHandler.bind(this)}
	visible={this.state.showBookDialog}
	bookDetails={this.state.bookDetails} />
<SettingsDialog
	closeDialog={this.hideSettingsDialog.bind(this)}
	visible={this.state.showSettingsDialog} />

</div > */}


const mainNode = document.querySelector("#app")
ReactDOM.render(<App />, mainNode)
