import React from "react";

export default class NonFunctional extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
  
	render() {
		return(
			<div>
				<h1 className='nonFunctionalHeader'>Даний функціонал перебуває в стані розробки</h1>
			</div>
		);
	}
}  