import React from "react";
import Select from "react-select";

import options from "../../utils/stack";

export default class EditUserTechnologies extends React.Component {
	state = {
		selectedOption: null,
		defaultOptions: [],
		isEdit: false
	}
	handleChange = (selectedOption) => {
		selectedOption = selectedOption.map((item) => {
			return item.value.toLowerCase();
		});

		this.props.getStack(selectedOption);
	}
	componentDidMount() {
		if (this.props.setDefaultTechnologies) {
			let defaultOptions = this.props.setDefaultTechnologies.map((item) => {
				return { value: item, label: item };
			});
			this.setState({ defaultOptions: defaultOptions });
			this.setState({ isEdit: true });
		}
	}

	render() {
		return (
			<Select
				value={this.state.defaultOptions}
				placeholder="Виберіть технології"
				isMulti
				closeMenuOnSelect={false}
				ref='selectedOption'
				name='selectedOption'
				onChange={this.handleChange.bind(this)}
				options={options}
				isDisabled={this.state.isEdit}
			/>
		);
	}
}