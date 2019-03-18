import React from "react";

export default class MainExperienceForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showInp: false,
			secondInpValue: null,
			isEdit: false
		};
	}

	getFirstYearExperience() {
		this.setState({ secondInpValue: this.refs.experienceFrom.value });
		this.setState({ showInp: true });
		this.props.getYears(this.refs.experienceFrom.value);
		this.props.getType(this.refs.devTypeExperience.value, this.refs.company.value);
	}

	getSecondYearExperience() {
		this.props.getYears(this.refs.experienceFrom.value, this.refs.experienceTo.value);
		this.props.getType(this.refs.devTypeExperience.value, this.refs.company.value);
	}

	renderYears(year) {
		let date = new Date().getFullYear();
		let yearsArr = [year];
		for (let i = yearsArr[0]; i <= date; i++) {
			if (i === yearsArr[0]) {
				continue;
			}
			yearsArr.push(i);
		}
		return yearsArr.map((year, item) => {
			return <option key={item}>{year}</option>;
		});
	}
	componentDidMount() {
		if (this.props.setToYear) {
			this.setState({ showInp: true });
		}
		if (this.props.setDefaultPosition || this.props.setDefaultCompany) {
			this.setState({ isEdit: true });
		}
	}

	render() {
		return (
			<div className='form-experience'>
				<input type='text' ref='devTypeExperience' name='devTypeExperience' className='form-control col-4' placeholder='На якій позиції працювала людина' defaultValue={this.props.setDefaultPosition} disabled={this.state.isEdit} />
				<input type='text' ref='company' name='company' className='form-control col-4' placeholder='В якій компанії працювала людина' defaultValue={this.props.setDefaultCompany} disabled={this.state.isEdit} />
				<span>в період з:</span>
				<select onChange={this.getFirstYearExperience.bind(this)} className="form-control col-1" ref='experienceFrom' name="experienceFrom" defaultValue={this.props.setFromYear} disabled={this.state.isEdit}>
					{this.renderYears(2009)}
				</select>
				<span>по:</span>
				{this.state.showInp ?
					<select onChange={this.getSecondYearExperience.bind(this)} className="form-control col-1" ref='experienceTo' name="experienceTo" defaultValue={this.props.setToYear} disabled={this.state.isEdit}>
						{this.renderYears(this.state.secondInpValue)}
					</select> : undefined}
			</div>
		);
	}
}