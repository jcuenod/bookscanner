import React from 'react'
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar
} from '@material-ui/core'

const BookList = ({ books }) => (
	<List>
		{books.map(b => {
			<ListItem>
				<ListItemAvatar>
					<Avatar alt={b.title} src={b.imgSrc} />
				</ListItemAvatar>
				<ListItemText primary={b.title} secondary={(b.authors || []).join(", ")} />
			</ListItem>
		})}
	</List>
)
export default BookList