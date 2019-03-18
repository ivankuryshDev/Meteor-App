import React from "react";
import { Meteor } from "meteor/meteor";
import history from "../utils/history";
import MainExperienceForm from "./candidate_components/experience/MainExperinceForm";
import EditUserTechnologies from "./candidate_components/EditUserTechnologies";
import EditUserDirection from "./candidate_components/EditUserDirection";

class EditCandidate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			candidate: [],
			error: "",
			devTypeExperience: "",
			company: "",
			experienceFrom: "",
			experienceTo: "",
			flag: 0
		};
		this.onBack = this.onBack.bind(this);
	}

	componentDidMount() {
		let id = this.props.match.params.id;
		this.setState({ id: id });

		Meteor.call("findCandidateById", id, (error, result) => {
			if (result) {
				this.setState({ candidate: result });
			}
		});
	}

	getDirections = (selectedOption) => {
		this.setState({
			devType: selectedOption
		});
	}

	onBack() {
		history.goBack();
	}

	inpCounter = 0;
	experience = null;
	experienceArr = [];

	getYearsExperience = (year1, year2) => {
		this.setState({
			experienceFrom: year1,
			experienceTo: year2
		});
	}

	getTypeExperience = (type, company) => {
		this.setState({ devTypeExperience: type, company: company });
	}

	addExperienceInput() {
		this.setState({ flag: +1 });
		this.inpCounter++;

		this.experience = {
			experienceFrom: this.state.experienceFrom,
			experienceTo: this.state.experienceTo,
			devType: this.state.devTypeExperience,
			company: this.state.company
		};
		this.experienceArr.push(this.experience);

	}

	renderExperienceComponents(amount) {
		let inpArr = [];
		for (let i = 0; i < amount; i++) {
			inpArr.push(<MainExperienceForm getYears={this.getYearsExperience} getType={this.getTypeExperience} />);
		}
		return inpArr.map((component, item) => {
			return (
				<div className="form-row" key={item}>
					<div className='form-group col'>
						<MainExperienceForm getYears={this.getYearsExperience} getType={this.getTypeExperience} />
					</div>
				</div>
			);
		});
	}

	deleteExpereinceComponent() {
		this.setState({ flag: +1 });
		if (this.inpCounter > 0) {
			this.inpCounter--;
		}
	}

	onSubmit(e) {
		e.preventDefault();
		this.experience = {
			experienceFrom: this.state.experienceFrom,
			experienceTo: this.state.experienceTo,
			devType: this.state.devTypeExperience,
			company: this.state.company
		};
		this.experienceArr.push(this.experience);
	}

	render() {
		const { candidate } = this.state;
		return (
			<div className='container'>
				{Object.keys(candidate).map((item, i) => (
					<div key={i}>
						<h1 className='headerEmployeeCreate'>Сторінка {candidate[item].name} {candidate[item].lastName}</h1>
						<form onSubmit={this.onSubmit.bind(this)} noValidate>
							<p className="candidateInputHeader">Ім'я та прізвище:</p>
							<div className='form-row'>
								<div className='form-group col'>
									<input type="text" ref='name' name='name' className="form-control" placeholder="Введіть ім'я" defaultValue={candidate[item].name} disabled />
								</div>
								<div className='form-group col'>
									<input type="text" ref='lastName' name='lastName' className="form-control" placeholder="Введіть прізвище" defaultValue={candidate[item].lastName} disabled />
								</div>
							</div>
							<div className="form-row">
								<div className='form-group col'>
									<label className="candidateInputHeader">Досвід роботи :</label>
									{Object.keys(candidate[item].experience).map((item2, j) => (
										<div key={j}>
											<MainExperienceForm getYears={this.getYearsExperience}
												getType={this.getTypeExperience}
												setDefaultPosition={candidate[item].experience[item2].devType}
												setDefaultCompany={candidate[item].experience[item2].company}
												setFromYear={candidate[item].experience[item2].experienceFrom}
												setToYear={candidate[item].experience[item2].experienceTo} />
										</div>
									))}
								</div>
							</div>
							{this.inpCounter > 0 ? this.renderExperienceComponents(this.inpCounter) : undefined}
							<p className="candidateInputHeader">Вкажіть напрямки по яких спеціалізується дана людина:</p>
							<EditUserDirection getDirections={this.getDirections} setDefaultDirections={candidate[item].directions} className="form-control" />
							<div className='form-row'>
								<div className='form-group col-4'>
									<label className="candidateInputHeader">Локація:</label>
									<input type="text" ref='location' name='location' className="form-control" placeholder='Область' defaultValue={candidate[item].location} disabled></input>
								</div>
								<div className='form-group col-4'>
									<p className="candidateInputHeader workTypeHeader">Оберіть тип роботи:</p>
									{candidate[item].workType === "remote" ? (
										<div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workType1" ref='workType' name="workType" className="custom-control-input" value='office' disabled />
												<label className="custom-control-label" htmlFor="workType1">В офісі</label>
											</div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workType2" ref='workType' name="workType" className="custom-control-input" value='remote' defaultChecked disabled />
												<label className="custom-control-label" htmlFor="workType2">Віддалено</label>
											</div>
										</div>
									) : (
										<div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workType1" ref='workType' name="workType" className="custom-control-input" value='office' defaultChecked disabled />
												<label className="custom-control-label" htmlFor="workType1">В офісі</label>
											</div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workType2" ref='workType' name="workType" className="custom-control-input" value='remote' disabled />
												<label className="custom-control-label" htmlFor="workType2">Віддалено</label>
											</div>
										</div>
									)}
								</div>
								<div className='form-group col-4'>
									<p className="candidateInputHeader workTypeHeader">Оберіть тип графіку:</p>
									{candidate[item].workTime === "fullTime" ? (
										<div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workTime1" ref='workTime' name="workTime" className="custom-control-input" value='fullTime' defaultChecked disabled />
												<label className="custom-control-label" htmlFor="workTime1">Повний робочий день</label>
											</div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workTime2" ref='workTime' name="workTime" className="custom-control-input" value='partTime' disabled />
												<label className="custom-control-label" htmlFor="workTime2">Не повний робочий день</label>
											</div>
										</div>
									) : (
										<div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workTime1" ref='workTime' name="workTime" className="custom-control-input" value='fullTime' disabled />
												<label className="custom-control-label" htmlFor="workTime1">Повний робочий день</label>
											</div>
											<div className="custom-control custom-radio">
												<input type="radio" id="workTime2" ref='workTime' name="workTime" className="custom-control-input" value='partTime' defaultChecked disabled />
												<label className="custom-control-label" htmlFor="workTime2">Не повний робочий день</label>
											</div>
										</div>
									)}
								</div>
							</div>
							<p className="candidateInputHeader">Email:</p>
							<div className='form-group'>
								<input type='email' ref='email' name='email' className='form-control' placeholder='введіть email' defaultValue={candidate[item].email} disabled></input>
							</div>
							<p className="candidateInputHeader">Телефон(и):</p>
							<div className='form-group row'>
								{/* <label className="col-sm-1 col-form-label socialMedia">Телефон:</label> */}
								<div className="col-5">
									<input type="text" ref='phone' name='phone' className="form-control" placeholder="введіть номер телефону" defaultValue={candidate[item].phone} disabled />
								</div>
								{candidate[item].secondPhone ?
									<div className="col-5">
										<input type="text" ref='secondPhone' name='secondPhone' className="form-control" placeholder="введіть другий номер телефону" defaultValue={candidate[item].secondPhone} disabled />
									</div> : undefined}
							</div>
							<p className="candidateInputHeader">Соціальні мережі:</p>
							{Object.keys(candidate[item].socialMedia).map((item2, j) => (
								<div key={j} className='form-group row'>
									<label className="col-sm-1 col-form-label socialMedia">{candidate[item].socialMedia[item2].name}:</label>
									<input type="text" ref='facebook' name='facebook' className="form-control col-4" placeholder="Вставте посилання" defaultValue={candidate[item].socialMedia[item2].url} disabled />
								</div>
							))}
							<div className='form-group'>
								<label className="candidateInputHeader">Технології які Ви знаєте:</label>
								<EditUserTechnologies getStack={this.getStackTeck} setDefaultTechnologies={candidate[item].techStack} />
							</div>
							<div className="form-group">
								<label className="candidateInputHeader">Коментар по людині:</label>
								<textarea ref='commentAboutPerson' name='commentAboutPerson' className="form-control" rows="3" placeholder="Наприклад опишіть слабкі та сильні сторони людини..." defaultValue={candidate[item].commentAboutPerson} disabled></textarea>
							</div>
							<div className="form-group">
								<label className="candidateInputHeader">Коментар по комункації:</label>
								<textarea ref='commentAboutComunication' name='commentAboutComunication' className="form-control" rows="3" placeholder="Наприклад опишіть наскільки людина комунікабельна..." defaultValue={candidate[item].commentAboutComunication} disabled></textarea>
							</div>
							<div className="row">
								<div className="col">
									<input type="button" className="btn btn-danger mt-1 mb-3" onClick={this.onBack} value="Повернутися назад" />
								</div>
							</div>
						</form>
					</div>
				))}
			</div>
		);
	}
}

export default EditCandidate;