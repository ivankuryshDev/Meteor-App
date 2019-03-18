import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { BrowserRouter  as Router } from "react-router-dom";

class EditUser extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			secondEmail: this.props.secondEmail,
			name: this.props.name,
			role: this.props.role,
			_id: this.props._id
		};

		this.onEdit = this.onEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	onDelete() {
		Meteor.call("deleteUser", this.props._id);
		location.reload();
	}

	onEdit() {
		if (this.state.isEdit) {
			this.setState({ isEdit: false });
		} else {
			this.setState({ isEdit: true });
		}
	}

	handleChange() {
		this.setState({ name: this.refs.name.value, secondEmail: this.refs.secondEmail.value, role: this.refs.role.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ isEdit: false });
		Meteor.call("updateUsers", this.state._id, this.state.name, this.state.secondEmail, this.state.role);
		location.reload();
	}

	render() {
		const mail = this.props.emails[0].address;
		const role = this.state.role;
		const currentUser = Accounts.userId();
		return (
			<Router>
				{
					this.state.isEdit
						? (
							<tr>
								<td>
									<form onSubmit={this.handleSubmit}>
										<div className="form-group">
											<span>Ім'я</span>
											<input placeholder="Name" name="name" className="form-control" ref='name' defaultValue={`${this.state.name}`} onChange={this.handleChange.bind(this)} required />
											<span>Емейл</span>
											<input type="email" placeholder="Email" className="form-control" disabled ref={mail => this.mail = mail} value={mail} required />
											<input type="hidden" name="emails" placeholder="Email" className="form-control" ref={mail => this.mail = mail} value={mail} required />
											<span>Запасний емейл</span>
											<input type="email" name="secondEmail" placeholder="Second Email" className="form-control" ref='secondEmail' defaultValue={`${this.state.secondEmail}`} onChange={this.handleChange.bind(this)} required />
											<span>Роль</span>
											<select className="form-control" name="role" ref='role' defaultValue={`${this.state.role}`} onChange={this.handleChange.bind(this)}>
												<option value="recruiter" defaultValue>Рекрутер</option>
												<option value="admin" >Адміністратор</option>
											</select>
											<br></br>
											<input type="submit"
												className="btn btn-block btn-primary " value="Зберегти" />
										</div>
									</form>
									<button className="btn btn-block btn-danger" onClick={this.onEdit}>Скасувати</button>
								</td>
							</tr>
						)
						: this.state.role === "superAdmin" ?
							<tr>
								<td>{mail}</td>
								<td>{role}</td>
								<td></td>
								<td></td>
							</tr>
							: currentUser === this.state._id ?
								<tr>
									<td>{mail}</td>
									<td>{role}</td>
									<td></td>
									<td></td>
								</tr>
								:
								<tr>
									<td>{mail}</td>
									<td>{role}</td>
									<td><button type="button" className="btn btn-primary" onClick={this.onEdit}>Редагувати</button></td>
									<td><button type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)}>Видалити</button></td>
								</tr>
				}
			</Router>
		);
	}
}


export default EditUser; 
