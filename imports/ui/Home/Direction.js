import  React from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

export default class Direction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isEdit: true
		};
	}

	deleteItem(event) {
		event.preventDefault();
		if (confirm("Ви точно впевені що хочете видалити цей напрям? Певні дані будуть втрачені назавжди!")) {
			Meteor.call("deleteDirection", this.props.index, this.refs.direction.value.trim());
			location.reload();
		}
	}

	updateItem(event) {
		this.setState({ isEdit: false });
		event.preventDefault();

	}

	onKeyPress(event) {

		if (event.key === "Enter") {
			this.setState({ isEdit: true });
			Meteor.call("updateDirection", this.props.index, this.refs.direction.value.trim());
			this.props.updateDirection(this.props.index, this.refs.direction.value.trim());

		} else if (event.key === "Escape") {
			this.refs.direction.value = this.props.link;
			this.setState({ isEdit: true });
		}
	}

	render() {
		return (
			<Link to={"/field/" + encodeURIComponent(this.props.link)} className="btn btn-lg btn-primary devType">
				<input disabled={this.state.isEdit} ref="direction" className="transparent" onKeyDown={this.onKeyPress.bind(this)}
					onClick={e => e.preventDefault()} defaultValue={this.props.link==="undefined" ? "Люди без напряму" : this.props.link} />
				<i onClick={this.deleteItem.bind(this)} className="fas icon delete-icon fa-times text-danger"></i>
				<i onClick={this.updateItem.bind(this)} className="fas icon edit-icon fa-pen text-warning"></i>
			</Link>
		);

	}
}