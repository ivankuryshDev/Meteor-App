import React from "react";
import { Meteor } from "meteor/meteor";
import history from "../utils/history";
import { Link } from "react-router-dom";
export default class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: "",
		};
	}

	onSubmit(event) {
		event.preventDefault();
		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();

		Meteor.loginWithPassword({ email }, password, (error) => {
			if (error) {
				if (error.reason === "User not found") {
					this.setState({ error: "Електронна пошта невірна" });
				} else if (error.reason === "Incorrect password") {
					this.setState({ error: "Невірний пароль" });
				} else {
					this.setState({ error: error.reason });
				}

			} else {
				this.setState({ error: "" });
				history.replace("/");
				location.reload();

			}
		});
	}

	render() {
		return (
			<div className="container mt-4">
				<h1>Сторінка Авторизації</h1>
				<div className="row d-flex align-items-center">
					<div className="col">
						<form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
							<input type="text" className="form-control"
								id="email" name="email" placeholder="Введіть email" ref="email" required />
							<br></br>
							<input type="password"
								className="form-control" id="password" name="password"
								placeholder="Введіть пароль" ref="password" required />
							<br />
							<div className="input-group input-sm">
								<Link to="/password_reset">Забули пароль?</Link>
							</div>
							<p className="text-danger">{this.state.error ? <span>{this.state.error}</span> : undefined}</p>
							<div className="form-actions">
								<input type="submit"
									className="btn btn-block btn-primary btn-default" value="Ввійти" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}


