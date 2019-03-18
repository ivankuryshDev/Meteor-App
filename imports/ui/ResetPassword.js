import  React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import  history  from "../utils/history";
import { Link } from "react-router-dom";


class ResetPassword extends React.Component {
	constructor() {
		super();
		this.state = {
			token: null,
			tokenCorrect: false,
			error: null,
			loading: true
		};
	}

	onSubmit(event){
		event.preventDefault();
    
		const password = this.refs.password.value.trim();
		const confirmPassword = this.refs.confirmPassword.value.trim();

		if(password!==confirmPassword){
			this.setState({error: "Паролі не співпадають!"});
		} else if(password.length<6){
			this.setState({error: "Пароль повинен бути довжиною хочаб 6 символів!"});
		} else if (password.length > 50) {
			return this.setState({ error: "Пароль повинен містити максимум 50 символів" });
		} else {
			this.setState({ error: "" });
    
			Accounts.resetPassword(this.state.token, password);
			history.replace("/");
			location.reload();
      
		}

	}

	componentDidMount() {
  
		let token = this.props.match.params.token;
    
		Meteor.call("findByResetToken", token, (error, result) => {
			if (result) {
				this.setState({ tokenCorrect: true, token,loading: false});
			} else {
				this.setState({loading: false});
			}
		});
  
	}

	render() {
		return (
			<div className="container">
				{ this.state.loading ? 
					<div>
					</div>
					: this.state.tokenCorrect ?

						<form onSubmit={this.onSubmit.bind(this)} className="container">
							<h2>Відновлення паролю</h2>
							<div className="form-group">
								<label htmlFor="password">Пароль</label>
								<input ref="password" name="password" type="password" className="form-control" id="password" placeholder="Введіть новий пароль" />
								<label htmlFor="confirmPassword">Підтвердіть пароль</label>
								<input ref="confirmPassword" name="confirmPassword" type="password" className="form-control" id="confirmPassword" placeholder="Підтвердіть пароль" />
							</div>
							<button type="submit" className="btn btn-block btn-primary">Надіслати</button>
							<span className="text-danger">{this.state.error ? this.state.error : " "}</span>
						</form>
						: <div className="container mt-4">
							<p className="text-danger">Вийшов строк дії посилання або воно некоректне</p>
							<Link className="btn btn-primary" to="/login"> На головну </Link>
						</div>
				}
			</div>
		);
	}
}

export default ResetPassword;