import React, { Component } from 'react'

const overlayStyles = {
	position: "absolute",
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
	position: "fixed",
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

const DetailDisplay = ({ addBookHandler, title, subtitle, author, date, publisher, imgSrc }) => (
	<div style={dialogStyles}>
		<div style={{ ...flexStyles, marginBottom: "6em" }}>
			<div style={{overflow: "scroll-y"}}>
				<h1>{title}</h1>
				<p>{subtitle}</p>
				<img src={imgSrc} style={{float: "left"}} />
				<div>{author}</div>
				<div>{date}</div>
				<div>{publisher}</div>
			</div>
		</div>
		<div style={{ ...flexStyles, textAlign: "center", bottom: 0 }}>
			<div className="button" onClick={addBookHandler}>
				ADD ITEM
			</div>
		</div>
	</div>
)

const BookDialog = ({visible, bookDetails, addBookHandler}) => (
	<div style={overlayStyles} className={visible ? "show" : ""}>
		<DetailDisplay {...bookDetails} addBookHandler={addBookHandler} />
	</div>
)
export default BookDialog
