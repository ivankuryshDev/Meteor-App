import React from "react";
import { Accounts } from "meteor/accounts-base";

class SendResetPassword extends React.Component {
	constructor() {
		super();
		this.state = {
			message: null,
			error : null,
			res: null
		};
	}
  
	onSubmit(event){
		event.preventDefault();
		let option = {};
		let email = this.refs.email.value.trim();
		option.email = email;

    
		Accounts.forgotPassword(option, (error) =>{
			if(error) {
				this.setState({message : ""});
				this.setState({error : "Не знайдено жодного користувача з такою поштою"});
			} else {
				this.setState({error : ""});
				this.setState({message : "Перевірте вашу пошту!"});
			}
		});
   
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)} className="container">
				<h2>Відновлення паролю</h2>
				<div className="form-group">
					<label htmlFor="email">Емейл</label>
					<input ref="email" name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Введіть емейл"/>
				</div>
				<button type="submit" className="btn btn-block btn-primary">Надіслати</button>
				<a type="submit" className="btn btn-block btn-primary" href='/'>На головну</a>
				<span className="text-danger">{this.state.error ? this.state.error: " "}</span>
				<span className="text-success">{this.state.message ? this.state.message: " "}</span>
			</form>
		);
	}
}

export default SendResetPassword;