import { Component } from 'react'

class VideoOverlay extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return [
			<video id="video" className={this.props.visibility ? "show" : ""} />,
			<div style={{position:"fixed", top: "5%", right: "5%"}}>
				<div className="roundButton" onClick={this.props.hide}>
					X
				</div>
				{/* turn flash on and off, switch video source */}
			</div>
		]
	}
}
