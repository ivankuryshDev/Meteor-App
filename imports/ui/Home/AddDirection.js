import React from "react";
import { Meteor } from "meteor/meteor";


export default class AddDirection extends React.Component {

	constructor(props) {
		super(props);    
 
		this.state = {
			isVisible: this.props.isVisible
		};
	}

	onSubmit(event){
		event.preventDefault();
		let direction = this.refs.direction.value.trim();
		Meteor.call("addDirection",direction);
		this.props.newDirectionCall(direction);
		this.refs.direction.value = "";
	}
 
	render(){
		return (
			this.props.isVisible ?
				<form onSubmit={this.onSubmit.bind(this)} className="mt-2 btn btn-lg btn-primary devType">
					<input ref="direction" className="transparent" placeholder="Введіть напрям тут" required type="text"/>
				</form> : <span></span>
		);
	}
}

