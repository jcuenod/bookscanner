import React from 'react'
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	ListItemSecondaryAction,
	IconButton
} from '@material-ui/core'
import {
	Delete as DeleteIcon,
	CloudUpload as CloudUploadIcon
} from '@material-ui/icons'

import BooklistManager from '../util/BooklistManager'
import * as SendToZotero from '../util/SendToZotero'

let observer_id = -1
class BookList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			books: BooklistManager.getAll()
		}
		observer_id = BooklistManager.registerObserver((books) => {
			this.setState({ books })
		})
	}

	onDelete(uid) {
		BooklistManager.remove(uid)
	}
	onSendToZotero(uid) {
		const { title, authors, publisher, date } = BooklistManager.get(uid)
		if (SendToZotero.checkForConfig()) {
			const success = SendToZotero.sendBookToZotero({ title, authors, publisher, date })
			if (success) {
				BooklistManager.markAsSent(uid)
			}
			else {
				alert("Failed to send to zotero for some reason...")
			}
		}
		else {
			alert("You must set a user ID and an API key to send a book to you Zotero library.")
		}
	}

	render() {
		return <List>
			{this.state.books.map(b =>
				<ListItem key={b.uid}>
					<ListItemAvatar>
						<Avatar alt={b.title} src={b.imgSrc} />
					</ListItemAvatar>
					<ListItemText primary={b.title} secondary={(b.authors || []).join(", ")} />

					<ListItemSecondaryAction>
						<IconButton
							disabled={"sent" in b && b.sent}
							style={("sent" in b && b.sent) ? { color: "#080" } : null}
							aria-label="send to zotero"
							onClick={() => this.onSendToZotero(b.uid)}
						>
							<CloudUploadIcon />
						</IconButton>
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={() => this.onDelete(b.uid)}
						>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			)}
		</List>
	}
}
export default BookList
