import React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.Component {
	render() {
		return (
			<div className="container">
				<h1>Не знайдено сторінки за даним адресом</h1>
				<Link className="btn btn-primary" to="/login">На головну</Link>
			</div>

		);
	}
}