import React, { Component } from 'react'
import IconButton from './IconButton'

const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -256 96 96"><path d="M38-216v30h-6v-30-1l2-1h3l1 1v1zm13 0v30h-5-1v-30-1l1-1h4l1 1v1zm13 0v30h-5-1v-30-1l1-1h3l2 1v1zm6 36v-47H26v49l1 2h42l1-2v-2zm-33-54h22l-2-6H40h-1zm46 2v4l-1 1h-5v47q0 4-2 7-3 4-6 4H27q-3 0-6-3-2-3-2-8v-47h-5l-1-1v-4-1l1-1h16l3-8 3-3 4-2h16l4 2 3 3 3 8h16l1 1v1z" fill="currentColor" /></svg>
const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M50 50l-1-1h-2l-1 1-12 11a3 3 0 104 4l7-7v17a3 3 0 006 0V58l7 7a3 3 0 004 0v-4z" fill="currentColor" /><path d="M71 37h-2a22 22 0 00-42 0h-2a14 14 0 000 29h2a3 3 0 000-5h-2a9 9 0 010-19l1 1v2a3 3 0 005 0v-4c2-8 9-14 17-14s15 6 17 14v4a3 3 0 005 0v-2l1-1a9 9 0 010 19h-2a3 3 0 000 5h2a14 14 0 000-29z" fill="currentColor" /></svg>

const BookListItem = ({ title, subtitle, authors, publisher, date, sent, imgSrc, onDelete, onSend }) => (
	<div className="bookListItem">
		<div style={{ backgroundImage: `url(${imgSrc})` }}></div>
		<div>
			<div style={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}>
				{title}
			</div>
			<p>{subtitle}</p>
			<p>{(authors || []).join(", ")}</p>
			<p>{[publisher, date].join(", ")}</p>
		</div>
		<div style={{ width: "56px" }}>
			<IconButton onClick={onDelete}
				classes={["deleteIcon"]}
				icon={trashIcon} />
		</div>
		<div style={{ width: "56px" }}>
			<IconButton onClick={onSend}
				classes={["sendIcon"].concat(sent ? "success" : [])}
				icon={sendIcon} />
		</div>
	</div>
)
export default BookListItem
