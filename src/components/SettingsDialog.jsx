import React from 'react'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	Button,
} from '@material-ui/core'

import SettingsManager from '../util/SettingsManager'

const SettingsDialog = ({ open, handleClose }) => {
	const [user_id, setUserId] = React.useState(SettingsManager.get(SettingsManager.USER_ID))
	const [api_key, setApiKey] = React.useState(SettingsManager.get(SettingsManager.API_KEY))
	const [default_collection, setDefaultCollection] = React.useState(SettingsManager.get(SettingsManager.DEFAULT_COLLECTION))

	const save = () => {
		if (user_id)
			SettingsManager.set(SettingsManager.USER_ID, user_id)
		if (api_key)
			SettingsManager.set(SettingsManager.API_KEY, api_key)
		if (default_collection)
			SettingsManager.set(SettingsManager.DEFAULT_COLLECTION, default_collection)
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Settings</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To connect to your Zotero account, please fill in an API key and a Username/ID.
				</DialogContentText>
				<TextField
					margin="dense"
					id="user_id"
					label="Username"
					type="text"
					onChange={(e) => setUserId(e.target.value)}
					fullWidth
				/>
				<TextField
					margin="dense"
					id="api_key"
					label="API Key"
					type="text"
					onChange={(e) => setApiKey(e.target.value)}
					fullWidth
				/>
				<TextField
					margin="dense"
					id="default_collection"
					label="Default Collection"
					type="text"
					onChange={(e) => setDefaultCollection(e.target.value)}
					placeholder={SettingsManager.get("default_collection")}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="default">
					Cancel
		  		</Button>
				<Button onClick={save} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default SettingsDialog
