import React from "react";
import { Meteor } from "meteor/meteor";
import EditUser from "./editUser";
import AddInvitationTable from "./addInvitationTable";
import Home from "../../ui/Home/Home";
import Login from "../Login";

export default class Admin extends React.Component {
	constructor() {
		super();

		this.state = {
			email: "",
			role: "",
			isVisible: false,
			message: null,
			loading: true,
			items: []
		};
		this.initializing = true;

	}

	fetchDataAndUpdateState() {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => {
			return {
				users: Meteor.users.find().fetch(),
			};
		});
		this.initializing = false;
	}

	componentDidMount() {
		Meteor.subscribe("users", () => {
			this.fetchDataAndUpdateState();
			this.setState({ loading: false });
		});
		Meteor.call("getRoleForAdmin", (error, result) => {
			if (result) {
				this.setState({ role: result });
			}
		});
	}

	componentWillMount() {
		const users = this.getLists();
		this.setState({ users });
	}

	getLists() {
		return this.state.users;
	}
	onAdd(emails, role) {
		const users = this.getLists();
		users.push({
			emails,
			role
		});
		this.setState({ users });
	}

	render() {
		const users = Meteor.users.find().fetch();

		const { loading } = this.state;

		if (loading) {
			return null;
		}
		return (
			<div className='container'>
				{this.state.role === "admin" || this.state.role === "superAdmin" ?
					<div className='container'>
						<AddInvitationTable />
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Email</th>
									<th scope="col">Role</th>
									<th scope="col"></th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{
									users.map((list, index) => {
										return (
											<EditUser
												key={index}
												{...list}
												onDelete={this.onDelete}
												handleSubmit={this.handleSubmit}
											/>
										);
									})
								}
							</tbody>
						</table>
					</div>
					: this.state.role === "recruiter" ? <Home />
						: <Login />
				}
			</div>
		);
	}
}