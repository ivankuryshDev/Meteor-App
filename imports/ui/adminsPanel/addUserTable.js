import React from "react";

class AddUserTable extends React.Component {
	constructor() {
		super();

		this.state = {
			send: false,
			isVisible: false
		};
		this.onDelete = this.onDelete.bind(this);
	}

	onDelete() {
		const { onDelete, index } = this.props;
		onDelete(index);
	}

	setSend() {
		if (this.send) {
			this.setState({ send: false });
		} else {
			this.setState({ send: true });
		}
	}

	render() {
		const { email, role } = this.props;
		return (
			<tr>
				<td><input disabled name="email" value={email} ></input></td>
				<td><input disabled name="role" value={role}></input></td>
				<td><input type="hidden" name="email" value={email} ></input></td>
				<td><input type="hidden" name="role" value={role}></input></td>
				<td><button type="button" className="btn btn-danger" onClick={this.onDelete}>Видалити</button></td>
			</tr>
		);
	}
}

export default AddUserTable;