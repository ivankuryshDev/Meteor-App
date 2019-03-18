import React from "react";

export default class CreateSocialMedia extends React.Component {

	pullSocialMediaValues(e) {
		e.preventDefault();
		this.props.getValues(this.refs.socialMediaName.value, this.refs.socialMediaUrl.value, false);
	}

	onCansle(e) {
		e.preventDefault();
		this.props.getValues(undefined, undefined, true);
	}

	render() {
		return (
			<div className='form-row'>
				<div className='form-group col'>
					<input type="text" ref='socialMediaName' name='socialMediaName' className="form-control" placeholder="Введіть назву соц.мережі" />
				</div>
				<div className='form-group col'>
					<input type="text" ref='socialMediaUrl' name='socialMediaUrl' className="form-control" placeholder="Введіть посилання" />
				</div>
				<button onClick={this.pullSocialMediaValues.bind(this)} className='btn btn-primary createSocialMediaBtn'>Додати</button>
				<button onClick={this.onCansle.bind(this)} className='btn btn-danger deleteSocialMediaBtn'>Відмінити</button>
			</div>
		);
	}
}