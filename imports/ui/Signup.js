import React from "react";
import history from "../utils/history";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";

export default class Signup extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			email: "",
			error: "",
			correctToken: false
		};
	}

	componentDidMount() {
		let token = this.props.match.params.token;
		Meteor.call("findByToken", token, (error, result) => {
		
			if (result) {
				this.setState({ correctToken: true, email: result.email });
			}

			this.setState({loading: false});

		});

	}

	onSubmit(event) {
		event.preventDefault();
		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();
		let secondEmail = this.refs.secondEmail.value.trim();
		let name = this.refs.name.value.trim();
		let confirmPassword = this.refs.confirmPassword.value.trim();

		if (password.length < 6) {
			return this.setState({ error: "Пароль повинен містити мінімум 6 символів" });
		}

		if (password.length > 50) {
			return this.setState({ error: "Пароль повинен містити максимум 50 символів" });
		}

		if(password!==confirmPassword){
			return this.setState({ error: "Паролі не співпадають!" });
		}

		Accounts.createUser({ email, password, secondEmail, name },
			(error) => {
				if (error) {
					this.setState({error: error.reason});
				} else {
					history.push("/login");
					location.reload();
				}
          
			}
		);
	}

	render() {
		const {loading} = this.state;
		if(loading) {
			return null;
		}
		return (
			this.state.correctToken ?

				<form onSubmit={this.onSubmit.bind(this)} className="container">

					<div className="form-group">
						<label htmlFor="email">Емейл</label>
						<input value={this.state.email} disabled type="email" className="form-control" />
						<input value={this.state.email} ref="email" type="hidden" className="form-control" />
						<label htmlFor="email">Емейл для сповіщень</label>
						<input required autoComplete="email" ref="secondEmail" name="secondEmail" type="email" className="form-control" placeholder="Введіть емейл для сповіщень" />
						<label htmlFor="name">Ім'я</label>
						<input required ref="name" name="name" id="name" type="text" className="form-control" placeholder="Введіть ім'я" />
						<label htmlFor="email">Пароль</label>
						<input required autoComplete="password" ref="password" type="password" className="form-control" placeholder="Пароль" />
						<label htmlFor="email">Підтвердження паролю</label>
						<input required autoComplete="password" ref="confirmPassword" name="confirmPassword" type="password" className="form-control" placeholder="Підтвердження паролю" />
					</div>
					<button type="submit" className="btn btn-block btn-primary">Надіслати</button>
					<p className="text-danger">
						{this.state.error ? this.state.error : undefined}
					</p>
				</form> : <div className="container mt-4">
					<p className="text-danger">Токен невірний або вийшов строк його дії</p>
					<Link className="btn btn-primary" to="/login">На головну</Link>
				</div>
		);
	}
}