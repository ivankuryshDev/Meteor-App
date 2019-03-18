import React from "react";

export default class SocialMedia extends React.Component {
	render() {
		return (
			<div className='additionalsocialMedia'>
				<label className="additionalMediaName">{this.props.name}:</label>
				<input type="text" ref={this.props.name} name={this.props.name} className="form-control socialMediaUrl" defaultValue={this.props.url} placeholder="Вставте посилання" />
			</div>
		);
	}
}