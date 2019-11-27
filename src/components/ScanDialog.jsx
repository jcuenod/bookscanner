import React from 'react'

import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Slide,
	makeStyles
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import VideoHelper from '../util/VideoHelper'

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

let scanning = false
const ensureScanning = (handleClose) => {
	if (!scanning) {
		VideoHelper.scanItem(handleClose)
		scanning = true
	}
}

const ScanDialog = ({ open, handleClose }) => {
	const classes = useStyles()
	const closeDialog = () => {
		scanning = false
		handleClose()
		VideoHelper.reset()
	}
	if (open) {
		ensureScanning(closeDialog)
	}
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={closeDialog}
			TransitionComponent={Transition}
			PaperProps={{
				style: {
					backgroundColor: '#000',
				}
			}} >
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Scan a Barcode
					</Typography>
				</Toolbar>
			</AppBar>
			<video id="video" style={{
				width: "100%",
				height: "100%",
			}} />
		</Dialog >
	)
}
export default ScanDialog