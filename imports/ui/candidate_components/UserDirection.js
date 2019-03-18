import React from "react";
import { Meteor } from "meteor/meteor";
import Select from "react-select";
export default class UserDirection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: [],
			defaultOptions: [],
			isEdit: false
		};
	}

	handleChange = (selectedOption) => {
		selectedOption = selectedOption.map((item) => {
			return item.value;
		});
		this.props.getDirections(selectedOption);
	}

	componentDidMount() {
		Meteor.call("getAllDirections", (error, result) => {
			if (result) {
				let options = result.directions.map((item) => {
					return { value: item, label: item };
				});
				this.setState({ directions: options });
			}
		});
		if (this.props.setDefaultDirections) {
			let defaultOptions = this.props.setDefaultDirections.map((item) => {
				return { value: item, label: item };
			});
			this.setState({ defaultOptions: defaultOptions });
			this.setState({ isEdit: true });
		}
	}

	render() {
		return (
			<Select
				placeholder="Виберіть напрям"
				isMulti
				closeMenuOnSelect={false}
				ref='selectedOption'
				name='selectedOption'
				onChange={this.handleChange.bind(this)}
				options={this.state.directions}
				isDisabled={this.state.isEdit}
			/>
		);
	}
}
