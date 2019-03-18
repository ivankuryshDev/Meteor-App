import React from "react";
import {Meteor} from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { withTracker } from "meteor/react-meteor-data";


class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: [],
			isEdit: true,
			isSave: false,
			isActivePassword: false,
			email: "",
			error: ""
		};

		this.onEditSubmit = this.onEditSubmit.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onActivePassword = this.onActivePassword.bind(this);
	}

	onActivePassword(){
		if(this.state.isActivePassword){
			this.setState({ isActivePassword: false });
		} else {
			this.setState({ isActivePassword: true });
		}
	}

	onEdit() {
		if(this.state.isEdit){
			this.setState({ isEdit: false, isSave: true });
		} else {
			this.setState({ isEdit: true, isSave: true });
		}
	}

	onEditSubmit(event) {
		event.preventDefault();
		let name = this.refs.name.value.trim();
		let oldPassword = this.refs.oldPassword.value.trim();
		let newPassword = this.refs.newPassword.value.trim();
		let confirmPassword = this.refs.confirmPassword.value.trim();
		let secondEmail = this.refs.secondEmail.value.trim();
        
		Meteor.call("updateOneUser", name, secondEmail);
    
		if(this.state.isActivePassword){
			if (newPassword.length < 6) {
				return this.setState({ error: "Пароль має містити більше 6-ти символів" });
			} else if(newPassword !== confirmPassword){
				return this.setState({ error: "Паролі не збігаються" });
			}
  
			Accounts.changePassword(oldPassword, newPassword, (error) => {
				if (error) {
					this.setState({error: "Неправильний старий пароль"});
				} else {
					location.reload();
				}
			});
		}else{
			location.reload();
		}
	}
  
	render() {
		const { isEdit, isActivePassword } = this.state;
		this.user = Meteor.users.find({_id: Accounts.userId()}).fetch();
		return (
			<div className="container col-5">
				<form onSubmit={this.onEditSubmit}>
					<div className="form-group">
						{Object.keys(this.user).map((item, i) => (
							<div key={i}>
								<span>Ім'я:</span>
								<input placeholder="Name" ref="name" name="name" className="form-control" disabled={isEdit} defaultValue={this.user[item].name} required />
								<span>Email:</span>
								<input type="email" name="email" placeholder="Email" className="form-control" disabled ref={email => this.user[item].emails[0].address = email} value={this.user[item].emails[0].address} required />
								<span>Другий email:</span>
								<input type="email" ref="secondEmail" name="secondEmail" placeholder="Email" className="form-control" disabled={isEdit} defaultValue={this.user[item].secondEmail} required />
								<br></br>
								<button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  Змінити пароль
								</button>
								<div className="collapse" id="collapseExample" onClick={this.onActivePassword}>
									<div className="card card-body">
										<span>Введіть старий пароль:</span>
										<input type="password" ref="oldPassword" name="oldPassword" placeholder="Cтарий пароль" className="form-control" disabled={isEdit} required={isActivePassword} />
										<span>Введіть новий пароль:</span>
										<input type="password" ref="newPassword" name="newPassword" placeholder="Новий пароль" className="form-control" disabled={isEdit} required={isActivePassword} />
										<span>Підтвердіть новий пароль:</span>
										<input type="password" ref="confirmPassword" name="confirmPassword" placeholder="Новий пароль" className="form-control" disabled={isEdit} required={isActivePassword} />
									</div>
								</div>
								<br></br>
								<br></br>
								<div className="row">
									<div className="col">
										<input type="submit" className="btn btn-success mt-1" value="Зберегти" disabled={isEdit}/>
									</div>
									<div className="col">
										<input type="button" className="btn btn-primary mt-1" onClick={this.onEdit} value="Редагувати" />
									</div>
									<div className="col">
										<a className="btn btn-danger mt-1" href="/setting">Відмінити</a>
									</div>
								</div>
							</div>
						))}
						<p className="text-danger">
							{this.state.error ? this.state.error : undefined}
						</p>
					</div>
				</form>
			</div>
		);
	}
}

const Setting = withTracker(({id}) => {
	const lists = Meteor.subscribe("user", id);
	const loading = !lists.ready();
	const list = Meteor.users.find(id);
	const listExists = !loading && !!list;
	return {
		loading,
		list,
		listExists
	};
})(Settings);

export default Setting;