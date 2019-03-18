import React from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

class Field extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			field: "",
			candidates: {}
		};
	}
	componentDidMount() {
		let field = this.props.match.params.field;
		field = decodeURIComponent(field);

		if (field.startsWith("search=true")) {
			field = field.slice(11);
			this.setState({ field: field });

			Meteor.call("findCandidatesByTechStack", field, (error, result) => {
				if (result) {
					this.setState({ candidates: result });
				}
			});

		} else {
			this.setState({ field: field });

			Meteor.call("findCandidatesByField", field, (error, result) => {
				if (result) {
					this.setState({ candidates: result });
				}
			});
		}
	}

	render() {
		const { candidates } = this.state;
		return (
			<div className='container-fluid'>
				<br></br>
				<h3 className="text-center">{this.state.field}</h3>
				<br></br>
				{candidates.length !== 0 ? (
					<table className="table table-hover">
						<thead>
							<tr>
								<th scope="col">Прізвище</th>
								<th scope="col">Ім'я</th>
								<th scope="col">Досвід</th>
								<th scope="col">Позиція</th>
								<th scope="col">Компанії</th>
								<th scope="col">Стек</th>
								<th scope="col">Коментар по комунікації</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(candidates).map((item, i) => (
								<tr key={i}>
									<td>{candidates[item].lastName}</td>
									<td>{candidates[item].name}</td>
									<td>{Object.keys(candidates[item].experience).map((item2, j) => (
										<div key={j}>
											{candidates[item].experience[item2].experienceTo - candidates[item].experience[item2].experienceFrom === 0 ? (
												<div>менше 1 р.</div>
											) : (
												<div>{candidates[item].experience[item2].experienceTo - candidates[item].experience[item2].experienceFrom} р.</div>
											)
											}
										</div>
									))}
									</td>
									<td>{Object.keys(candidates[item].experience).map((item2, j) => (
										<div key={j}>
											{candidates[item].experience[item2].devType}
										</div>
									))}
									</td>
									<td>{Object.keys(candidates[item].experience).map((item2, j) => (
										<div key={j}>
											{candidates[item].experience[item2].company}
										</div>
									))}
									</td>
									<td>{Object.keys(candidates[item].techStack).map((item2, j) => (
										<div key={j}>
											- {candidates[item].techStack[item2]}
										</div>
									))}</td>
									<td>{candidates[item].commentAboutPerson}</td>
									<td>
										<Link to={"/edit_candidate/" + candidates[item]._id} className="btn btn-md btn-primary">
											Переглянути
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<h3 className="text-center">По даному напрямі немає кандидатів</h3>
				)}
			</div>
		);
	}
}

export default Field;