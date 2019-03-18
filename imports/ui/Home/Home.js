import React from "react";
import { Meteor } from "meteor/meteor";
import Direction from "./Direction";
import AddDirection from "./AddDirection";

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			directions: [],
			isVisible: false
		};
	}

	OnClick() {
		if (this.state.isVisible) {
			this.setState({ isVisible: false });
		} else {
			this.setState({ isVisible: true });
		}
	}


	componentDidMount() {
		Meteor.call("getAllDirections", (error, result) => {

			if (result) {
				let directions = result;
				this.setState({ directions: directions.directions });

			}

		});

	}

	newDirection = (direction) => {
		let directions = this.state.directions;
		if (directions.some((value) => direction === value)) {
			alert("Вже існує напрям з даною назвою");

		} else {
			directions.push(direction);
			this.setState({ directions });
		}
	}

	updateDirection = (index, direction) => {
		let directions = this.state.directions;
		if (directions.some((value) => direction === value)) {
			alert("Вже існує напрям з даною назвою");
			location.reload();
		} else {
			directions.splice(index, 1, direction);
			this.setState({ directions });
		}
	}


	render() {
		return (
			<div className='container'>
				<h1 className='homeHeader'>Оберіть напрямок щоб побачити які працівників які підпадають під даний вибір:</h1>
				<div className="row">
					<div className="col">
						{this.state.directions.map((direction, index) => {
							return <Direction updateDirection={this.updateDirection} index={index} key={index} link={direction} />;
						})
						}
					</div>
				</div>
				<button onClick={this.OnClick.bind(this)} className="btn btn-outline-primary rounded-circle ml-4 btn-lg">+</button>
				<AddDirection newDirectionCall={this.newDirection} isVisible={this.state.isVisible} />
			</div>
		);
	}
}