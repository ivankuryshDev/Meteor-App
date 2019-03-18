import React from "react";

import AddUser from "./addUser";
import AddUserTable from "./addUserTable";
import { saveManyInvites } from "../../sendEmails/saveInvite";

export default class AddInvitationTable extends React.Component {
	constructor() {
		super();

		this.state = {
			email: "",
			role: "",
			isVisible: false,
			items: []
		};
		this.onDelete = this.onDelete.bind(this);
	}

	sendManyInvites(event) {
		event.preventDefault();
		saveManyInvites(this.state.items);
		this.setState({ items: [], isVisible: false });
	}

	onDelete(index) {
		const lists = this.state.items;
		if (lists.length === 1) {
			this.setState({ items: [] });
		} else {
			lists.splice(index, 1);
			this.setState({ items: lists });
		}

	}


	handleFormSubmit = (e) => {
		e.preventDefault();
		this.setState({ isVisible: true });
		let items = [...this.state.items];

		items.push({ email: this.state.email, role: this.state.role });

		this.setState({
			items,
			email: "",
			role: ""
		});
	};

	handleInputChange = (e) => {
		e.preventDefault();
		let input = e.target;
		let name = e.target.name;
		let value = input.value;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div>
				<AddUser handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} newEmail={this.state.email}
					newRole={this.state.role} />
				{this.state.isVisible ? (
					<form onSubmit={this.sendManyInvites.bind(this)}>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Емейл</th>
									<th scope="col">Роль</th>
									<th scope="col"></th>
									<th scope="col"></th>
									<th scope="col"></th>

								</tr>
							</thead>
							<tbody>
								{
									this.state.items.map((item, index) => {
										return (
											<AddUserTable
												key={index}
												{...item}
												onDelete={this.onDelete.bind(this, index)}
												isVisible={this.state.isVisible}
											/>
										);
									})
								}
							</tbody>
						</table>
						<button className="btn-primary btn">Надіслати запрошення</button>
					</form>
				) : (
					<div></div>
				)}
			</div>
		);
	}
}
