import React from "react";

export default class SendInvite extends React.Component {

	onSubmit(event){
		event.preventDefault();
	}

	render() {
		return (<div className="container">
			<form className="pt-4 form-group" onSubmit={this.onSubmit.bind(this)}>
				<label htmlFor="email">
      Емейл
					<input id="email" ref="email" type="email" className="form-control" required/>
				</label>
				<label htmlFor="role">
					<select className="form-control" id="role" ref="role"  name="role" onChange={this.props.handleInputChange} required>
						<option value="">Виберіть роль</option>
						<option value="admin">Адміністратор</option>
						<option value="recruiter">Рекрутер</option>
					</select>
				</label>
				<button type="submit" className="btn btn-primary btn-default">Надіслати</button>
			</form>
		</div>);
	}
}