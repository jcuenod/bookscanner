import React, { useState } from 'react'

import SettingsManager from '../util/SettingsManager'

const overlayStyles = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	background: "rgba(255,255,255,0.6)",
	opacity: 0,
	transform: "scale(0.7)",
	transition: "opacity 300ms linear, transform 300ms linear"
}
const dialogStyles = {
	position: "absolute",
	top: "10%",
	left: "5%",
	bottom: "5%",
	right: "10%",
	borderRadius: "10px",
	background: "#B8C9D5",
}
const flexStyles = {
	position: "absolute",
	left: 0,
	width: "100%",
	padding: "1em"
}

const saveSettings = ({ userId, apiKey, defaultCollection, closeDialog }) => {
	SettingsManager.set("default_collection", defaultCollection)
	SettingsManager.set("user_id", userId)
	SettingsManager.set("api_key", apiKey)
	closeDialog()
}

const Dialog = ({ closeDialog }) => {
	const { api_key, user_id, default_collection } = SettingsManager.getAll()
	const [defaultCollection, setDefaultCollection] = useState("")
	const [userId, setUserId] = useState("")
	const [apiKey, setApiKey] = useState("")
	return (
		<div style={dialogStyles}>
			<div style={{ ...flexStyles, marginBottom: "6em" }}>
				<div style={{ overflow: "scroll-y" }}>
					<h1>Please enter your settings below:</h1>
					<label htmlFor="api_key">Default Collection</label>
					<input name="api_key" type="text" placeholder={default_collection || "ZBookScanner"} onInput={e => setDefaultCollection(e.target.value)}></input>
					<label htmlFor="user_id">User ID</label>
					<input name="user_id" type="text" placeholder={user_id || "9130595"} onInput={e => setUserId(e.target.value)} /><br />
					<label htmlFor="api_key">API Key</label>
					<input name="api_key" type="text" placeholder={api_key || "P9NiFoyLeZu2bZNvvuQPDWsd"} onInput={e => setApiKey(e.target.value)}></input>
				</div>
			</div>
			<div style={{ ...flexStyles, textAlign: "center", bottom: 0 }}>
				<div className="button" onClick={() => saveSettings({ userId, apiKey, defaultCollection, closeDialog })}>
					SAVE
				</div>
			</div>
		</div>
	)
}

const SettingsDialog = ({ visible, closeDialog }) => (
	<div style={{ ...overlayStyles, pointerEvents: (visible ? "auto" : "none") }} className={visible ? "show" : ""}>
		<Dialog closeDialog={closeDialog} />
	</div>
)
export default SettingsDialog
