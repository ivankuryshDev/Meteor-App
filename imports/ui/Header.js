import React from "react";
import { Meteor } from "meteor/meteor";
import history from "../utils/history";
import { Link } from "react-router-dom";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			role: this.props.role,
			name: "",
			loged: false,
			search: " "
		};
	}
	componentDidMount() {
		if(Meteor.userId()){
			Meteor.call("getUserRoleAndName", (error,result) => {
				if(result) {
					this.setState({role: result.role, name: result.name});
				}
			});  
			
			this.setState({loged:true});
		}
	}


	onSubmit(event){
		event.preventDefault();
		history.push("/field/search=true" + encodeURIComponent(this.refs.search.value));
		location.reload();
	}

	logout(){

		this.setState({loged: false});
	
		// eslint-disable-next-line no-undef
		Accounts.logout(function(){
			history.replace("/login");
		});
	}
	
	showUser() {
		let userRole = "";

		switch(this.state.role) {
		case "admin":
			userRole = "Адміністратор";
			break;
		case "superAdmin":
			userRole = "Директор";
			break;
		case "recruiter":
			userRole = "Рекрутер";
			break;
		}

		return userRole;
	}
	
	render() {		
		return (	
			this.state.loged  ? 
				<header>
					<nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex flex-row">													
						<div className='collapse navbar-collapse d-flex flex-row justify-content-between'>
							<ul className="navbar-nav align-items-center">	
								<li className="nav-item">
									<a className="navbar-brand" href="/">
									</a>
								</li>
								<span className="navbar-brand mb-0 h1">Recruiter App</span>												
								<li className="nav-item">
									<a className="nav-link" href="/">Головна</a>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Меню</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<Link className="dropdown-item" to="/new_candidate">Додати кандидата</Link>
										<Link className="dropdown-item" to="/setting">Налаштування</Link>
										{this.state.role === "admin" || this.state.role === "superAdmin" ? (
											<Link className="dropdown-item" to="/admin">Адмін</Link>
										):(
											<div></div>
										)
										}
									</div>
								</li>
							</ul>
							<ul className='navbar-nav'>
								<form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
									<input ref="search" className="form-control mr-2" type="search" placeholder="Пошук" aria-label="Search"/>
									<button className="btn btn-light my-sm-0" type="submit">Шукати</button>
								</form>
							</ul>
							<ul className='navbar-nav'>
								<li className='nav-item userHeader'>
									<Link to='/setting' className='nav-link'>{this.showUser() + " " + this.state.name}</Link>
								</li>
							</ul>							
							<ul className='navbar-nav'>
								<li className='nav-item userHeader'>
								</li>
							</ul>
							<ul className='navbar-nav'>
								<li className='nav-item quit'>
									<a className="nav-link" onClick={this.logout.bind(this)}>Вийти</a>	
								</li>
							</ul>
						</div>						
					</nav>
				</header> : <span></span>
		);
	}
}

export default Header;