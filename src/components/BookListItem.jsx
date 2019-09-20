import React, { Component } from 'react'

const BookListItem = ({title, subtitle, author, publisher, date, imgSrc}) => (
	<div className="bookListItem">
		<div style={{ backgroundImage:`url(${imgSrc})` }}></div>
		<div>
			<div style={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}>
				{title}
			</div>
			<p>{subtitle}</p>
			<p>{author}</p>
			<p>{[publisher, date].join(", ")}</p>
		</div>
	</div>
)
export default BookListItem
