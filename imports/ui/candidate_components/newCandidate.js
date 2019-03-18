import React from "react";
import { Meteor } from "meteor/meteor";

import MainExperienceForm from "./experience/MainExperinceForm";
import SocialMedia from "./SocialMedia";
import CreateSocialMedia from "./CreateSocialMedia";
import Technologies from "./Technologies";
import AddFileAttachment from "./addFileAttachment";
import UserDirection from "./UserDirection";

export default class NewCandidate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: "",
			techStack: [],
			workType: "office",
			workTime: "fullTime",
			deleteListener: false,
			socialMediaNames: [],
			socialMediaUrl: "",
			socialMediaArr: [],
			socialMediaCounter: 0,
			renderCreateSocialMedia: false,
			renderSecondPhone: false,
			renderSecondEmail: false,
			secondEmail: undefined,
			secondPhone: undefined,
			facebook: undefined,
			skype: undefined,
			linkedin: undefined,
			submit: false
		};
	}

	devTypeExperience = "";
	company = "";
	experienceFrom = "";
	experienceTo = "";
	inpCounter = 0;
	experience = null;
	experienceArr = [];

	getYearsExperience = (year1, year2) => {
		this.experienceFrom = year1;
		this.experienceTo = year2;
	}

	getTypeExperience = (type, company) => {
		this.devTypeExperience = type;
		this.company = company;
	}

	getStackTeck = (selectedOption) => {
		this.setState({
			techStack: selectedOption
		});
	}

	getDirections = (selectedOption) => {
		this.setState({
			devType: selectedOption
		});
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
						{component}
					</div>
				</div>
			);
		});
	}

	addExperienceInput() {
		this.setState({ deleteListener: false });
		this.inpCounter++;

		if (this.experienceTo === undefined) {
			this.experience = {
				experienceFrom: this.experienceFrom,
				experienceTo: this.experienceFrom,
				devType: this.devTypeExperience,
				company: this.company
			};
		} else {
			this.experience = {
				experienceFrom: this.experienceFrom,
				experienceTo: this.experienceTo,
				devType: this.devTypeExperience,
				company: this.company
			};
		}

		if (this.state.deleteListener === false) {
			this.experienceArr.push(this.experience);
		}
	}

	deleteExpereinceComponent() {
		if (this.inpCounter > 0) {
			this.inpCounter--;
		}

		if (this.state.deleteListener === true) {
			this.experienceArr.pop();
		}
		this.setState({ deleteListener: true });
	}

	renderSocialMediaComponents(amount) {
		let componentsArr = [];
		for (let i = 0; i < amount; i++) {
			componentsArr.push(<SocialMedia name={this.state.socialMediaNames[i]} url={this.state.socialMediaUrl} />);
		}
		return componentsArr.map((component, item) => {
			return (
				<div key={item}>
					{component}
				</div>
			);
		});
	}

	deleteSocialMedia() {
		let arr = this.state.socialMediaArr;
		let socNames = this.state.socialMediaNames;
		arr.pop();
		socNames.pop();
		let counter = this.state.socialMediaCounter - 1;
		this.setState({
			socialMediaArr: arr,
			socialMediaNames: socNames,
			socialMediaCounter: counter,
			renderCreateSocialMedia: false
		});
	}

	getSocialMediaValues = (name, url, cancel) => {
		if (cancel) {
			this.setState({ renderCreateSocialMedia: false });
		} else {
			let arr = this.state.socialMediaArr;
			let socNames = this.state.socialMediaNames;
			arr.push({ name, url });
			socNames.push(name);
			let counter = this.state.socialMediaCounter + 1;
			this.setState({
				socialMediaNames: socNames,
				socialMediaUrl: url,
				socialMediaArr: arr,
				socialMediaCounter: counter,
				renderCreateSocialMedia: false
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.state.error === "") {
			this.state.socialMediaArr.push({ name: this.refs.facebook.name, url: this.state.facebook });
			this.state.socialMediaArr.push({ name: this.refs.skype.name, url: this.state.skype });
			this.state.socialMediaArr.push({ name: this.refs.linkedin.name, url: this.state.linkedin });

			if (this.experienceTo === undefined) {
				this.experience = {
					experienceFrom: this.experienceFrom,
					experienceTo: this.experienceFrom,
					devType: this.devTypeExperience,
					company: this.company
				};
			} else {
				this.experience = {
					experienceFrom: this.experienceFrom,
					experienceTo: this.experienceTo,
					devType: this.devTypeExperience,
					company: this.company
				};
			}

			if (this.state.deleteListener === false) {
				this.experienceArr.push(this.experience);
			}
		}

		let techStack = this.state.techStack;
		let devType = this.state.devType;
		let name = this.refs.name.value;
		let lastName = this.refs.lastName.value;
		let experience = this.experienceArr;
		let location = this.refs.location.value;
		let workType = this.state.workType;
		let workTime = this.state.workTime;
		let email = this.refs.email.value;
		let secondEmail = this.state.secondEmail;
		let phone = this.refs.phone.value;
		let secondPhone = this.state.secondPhone;
		let socialMedia = this.state.socialMediaArr;
		let commentAboutPerson = this.refs.commentAboutPerson.value;
		let commentAboutComunication = this.refs.commentAboutComunication.value;

		if (Meteor.userId()) {

			Meteor.call("createCandidate",
				techStack,
				devType,
				name,
				lastName,
				experience,
				location,
				workType,
				workTime,
				email,
				secondEmail,
				phone,
				secondPhone,
				socialMedia,
				commentAboutPerson,
				commentAboutComunication,
				commentAboutComunication,

				(error) => {
					if (error) {
						this.setState({ error: error.reason });
					} else {
						this.setState(
							{ error: "", submit: true }
						);
					}
				}
			);
		}
	}
	render() {
		{this.state.submit ? location.reload() : undefined;}
		return (
			<div className='container'>
				<h1 className='headerEmployeeCreate'>Створення людини в базі</h1>
				<form onSubmit={this.onSubmit.bind(this)} noValidate>
					<p className="candidateInputHeader">Ім'я та прізвище:</p>
					<div className='form-row'>
						<div className='form-group col'>
							<input type="text" ref='name' name='name' className="form-control" placeholder="Введіть ім'я" />
						</div>
						<div className='form-group col'>
							<input type="text" ref='lastName' name='lastName' className="form-control" placeholder="Введіть прізвище" />
						</div>
					</div>
					<div className="form-row">
						<div className='form-group col'>
							<label className="candidateInputHeader">Досвід роботи :</label>
							<MainExperienceForm getYears={this.getYearsExperience} getType={this.getTypeExperience} />
						</div>
					</div>
					{this.inpCounter > 0 ? this.renderExperienceComponents(this.inpCounter) : undefined}
					<i onClick={this.addExperienceInput.bind(this)} className="fas fa-plus addButton"></i>
					{this.inpCounter > 0 ? <i onClick={this.deleteExpereinceComponent.bind(this)} className='fas fa-minus deleteButton'></i> : undefined}
					<p className="candidateInputHeader">Вкажіть напрямки по яких спеціалізується дана людина:</p>
					<UserDirection getDirections={this.getDirections} className="form-control" />
					<div className='form-row'>
						<div className='form-group col-4'>
							<label className="candidateInputHeader">Локація:</label>
							<input type="text" ref='location' name='location' className="form-control" placeholder='Область'></input>
						</div>
						<div className='form-group col-4'>
							<p className="candidateInputHeader workTypeHeader">Оберіть тип роботи:</p>
							<div className="custom-control custom-radio">
								<input onChange={(e) => this.setState({workType: e.target.value})} type="radio" id="workType1" ref='workType' name="workType" className="custom-control-input" value='office' defaultChecked/>
								<label className="custom-control-label" htmlFor="workType1">В офісі</label>
							</div>
							<div className="custom-control custom-radio">
								<input onChange={(e) => this.setState({workType: e.target.value})} type="radio" id="workType2" ref='workType' name="workType" className="custom-control-input" value='remote' />
								<label className="custom-control-label" htmlFor="workType2">Віддалено</label>
							</div>
						</div>
						<div className='form-group col-4'>
							<p className="candidateInputHeader workTypeHeader">Оберіть тип графіку:</p>
							<div className="custom-control custom-radio">
								<input onChange={(e) => this.setState({workTime: e.target.value})} type="radio" id="workTime1" ref='workTime' name="workTime" className="custom-control-input" value='fullTime' defaultChecked/>
								<label className="custom-control-label" htmlFor="workTime1">Повний робочий день</label>
							</div>
							<div className="custom-control custom-radio">
								<input onChange={(e) => this.setState({workTime: e.target.value})} type="radio" id="workTime2" ref='workTime' name="workTime" className="custom-control-input" value='partTime' />
								<label className="custom-control-label" htmlFor="workTime2">Не повний робочий день</label>
							</div>
						</div>
					</div>
					<p className="candidateInputHeader">Email:</p>
					<div className='form-group row'>
						<label className="col-sm-1 col-form-label socialMedia">Email:</label>
						<div className="col-5">
							<input type="email" ref='email' name='email' className="form-control" placeholder="введіть email" />
						</div>
						{this.state.renderSecondEmail ?
							<div className="col-5">
								<input onChange={() => this.setState({ secondEmail: this.refs.secondEmail.value })} type="email" ref='secondEmail' name='secondEmail' className="form-control" placeholder="введіть другий email" />
							</div> : undefined}
						{!this.state.renderSecondEmail ? <i onClick={() => this.setState({ renderSecondEmail: true })} className="fas fa-plus addButton"></i> : undefined}
						{this.state.renderSecondEmail ? <i onClick={() => this.setState({ renderSecondEmail: false })} className="fas fa-minus deleteButton"></i> : undefined}
					</div>
					<p className="candidateInputHeader">Телефон:</p>
					<div className='form-group row'>
						<label className="col-sm-1 col-form-label socialMedia">Телефон:</label>
						<div className="col-5">
							<input type="text" ref='phone' name='phone' className="form-control" placeholder="введіть номер телефону" />
						</div>
						{this.state.renderSecondPhone ?
							<div className="col-5">
								<input onChange={() => this.setState({ secondPhone: this.refs.secondPhone.value })} type="text" ref='secondPhone' name='secondPhone' className="form-control" placeholder="введіть другий номер телефону" />
							</div> : undefined}
						{!this.state.renderSecondPhone ? <i onClick={() => this.setState({ renderSecondPhone: true })} className="fas fa-plus addButton"></i> : undefined}
						{this.state.renderSecondPhone ? <i onClick={() => this.setState({ renderSecondPhone: false })} className="fas fa-minus deleteButton"></i> : undefined}
					</div>
					<p className="candidateInputHeader">Соціальні мережі:</p>
					<div className='form-group row'>
						<label className="col-sm-1 col-form-label socialMediaName">Facebook:</label>
						<div className="col-sm-3">
							<input onChange={() => this.setState({ facebook: this.refs.facebook.value })} type="text" ref='facebook' name='facebook' className="form-control" placeholder="Вставте посилання" />
						</div>
						<label className="col-sm-1 col-form-label socialMediaName">Skype:</label>
						<div className="col-sm-3">
							<input onChange={() => this.setState({ skype: this.refs.skype.value })} type="text" ref='skype' name='skype' className="form-control" placeholder="Вставте посилання" />
						</div>
						<label className="col-sm-1 col-form-label socialMediaName">LinkedIn:</label>
						<div className="col-sm-3">
							<input onChange={() => this.setState({ linkedin: this.refs.linkedin.value })} type="text" ref='linkedin' name='linkedin' className="form-control" placeholder="Вставте посилання" />
						</div>
					</div>
					<div className='form-group row'>
						{this.state.socialMediaCounter > 0 ? this.renderSocialMediaComponents(this.state.socialMediaCounter) : undefined}
					</div>
					<i onClick={() => this.setState({ renderCreateSocialMedia: true })} className="fas fa-plus addButton"></i>
					{this.state.socialMediaCounter > 0 ? <i onClick={this.deleteSocialMedia.bind(this)} className="fas fa-minus deleteButton"></i> : undefined}
					{this.state.renderCreateSocialMedia === true ? <div className="createSocialMedia"><CreateSocialMedia getValues={this.getSocialMediaValues} /></div> : undefined}					
					<div className='form-group'>
						<label className="candidateInputHeader">Технології які Ви знаєте</label>
						<Technologies getStack={this.getStackTeck} />
					</div>
					<div className="form-group">
						<label className="candidateInputHeader">Коментар по людині:</label>
						<textarea ref='commentAboutPerson' name='commentAboutPerson' className="form-control" rows="3" placeholder="Наприклад опишіть слабкі та сильні сторони людини..."></textarea>
					</div>
					<div className="form-group">
						<label className="candidateInputHeader">Коментар по комункації:</label>
						<textarea ref='commentAboutComunication' name='commentAboutComunication' className="form-control" rows="3" placeholder="Наприклад опишіть наскільки людина комунікабельна..."></textarea>
					</div>
					
					<div className="form-group">
						<label className="candidateInputHeader">Прикріпити резюме:</label>
						<AddFileAttachment />
					</div>

					{this.state.error ? <p className='error'>{this.state.error}</p> : undefined}
					{this.state.submit ? <p>Кандидат успішно створений!</p> : undefined}
					<button className='btn btn-primary createCandidateBtn'>Створити</button>
				</form>
			</div>
		);
	}
}