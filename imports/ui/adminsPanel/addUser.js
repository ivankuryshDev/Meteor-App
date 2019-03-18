import React from "react";

class AddUser extends React.Component {
	render() {
		return (
			<div id="Form">
				<h3>Додати користувача</h3>
				<form className="form-group" onSubmit={this.props.handleFormSubmit}>
					<label htmlFor="email">
						Пошта
						<br></br>
						<input required id="email" type="email" className="form-control"
							value={this.props.newEmail} 
							name="email" onChange={this.props.handleInputChange} placeholder="Email"
						/>
					</label>
					<br></br>
					<label htmlFor="role">
						Пароль
						<br></br>
						<select className="form-control" id="role" value={this.props.newRole} name="role" onChange={this.props.handleInputChange} required>
							<option value="">Виберіть роль</option>
							<option value="admin">Адміністратор</option>
							<option value="recruiter">Рекрутер</option>
						</select>
					</label>
					<br></br>
					<button type="submit" className="btn btn-success btn-default" value="Submit">Додати користувача</button>
				</form>
			</div>

		);
	}
}
export default AddUser;