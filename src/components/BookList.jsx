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
import { Delete as DeleteIcon } from '@material-ui/icons'

const BookList = ({ books }) => (
	<List>
		{books.map(b =>
			<ListItem>
				<ListItemAvatar>
					<Avatar alt={b.title} src={b.imgSrc} />
				</ListItemAvatar>
				<ListItemText primary={b.title} secondary={(b.authors || []).join(", ")} />

                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                 </ListItemSecondaryAction>
			</ListItem>
		)}
	</List>
)
export default BookList
