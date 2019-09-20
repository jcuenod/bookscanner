import React, { Component } from 'react'

const BookListItem = ({title, subtitle, author, publisher, date, imgSrc}) => (
	<div style={{display:"flex", flexDirection:"row"}}>
		<div style={{flex:"0 0 auto"}}>
			<img src={imgSrc} height="90px" />
		</div>
		<div style={{flex:"1 0 auto"}}>
			<div style={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}>{title}</div>
			<p>{subtitle}</p>
			<p>{author}</p>
			<p>{[publisher, date].join(", ")}</p>
		</div>
	</div>
)
export default BookListItem
