import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Directions } from "./directions";

export const Candidates = new Mongo.Collection("candidates");
if (Meteor.isServer) {
	Meteor.publish("candidates", () => {
		return Candidates.find();
	});
}

Meteor.methods({
	"createCandidate"(
		techStack,
		directions,
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
	) {

		if (!this.userId) {
			throw new Meteor.Error("Ви не є користувачем даної програми!");
		}

		new SimpleSchema({
			name: {
				type: String,
				label: "Ім'я",
				min: 2,
				max: 50
			},

			lastName: {
				type: String,
				label: "Прізвище",
				min: 2,
				max: 50
			},

			experience: {
				type: Array,
				optional: true
			},

			"experience.$": {
				type: Object,
				optional: true
			},

			"experience.$.devType": {
				type: String,
				optional: true
			},

			"experience.$.company": {
				type: String,
				optional: true
			},

			"experience.$.experienceFrom": {
				type: String,
				optional: true
			},

			"experience.$.experienceTo": {
				type: String,
				optional: true
			},

			location: {
				type: String,
				label: "Проживання",
				min: 3,
				max: 70
			},

			workType: {
				type: String,
				label: "Тип роботи",
				allowedValues: ["office", "remote"]
			},

			workTime: {
				type: String,
				label: "Графік роботи",
				allowedValues: ["fullTime", "partTime"]
			},

			email: {
				type: String,
				label: "Емейл",
				regEx: SimpleSchema.RegEx.Email
			},

			secondEmail: {
				type: String,
				optional: true,
				label: "Додатковий Емейл",
				regEx: SimpleSchema.RegEx.Email
			},

			phone: {
				type: String,
				label: "Телефон",
				regEx: /^([0-9]{10}|([+])[^0][0-9]{10,15})$/g
			},

			secondPhone: {
				type: String,
				optional: true,
				label: "Другий телефон",
				regEx: /^([0-9]{10}|([+])[^0][0-9]{10,15})$/g
			},

			socialMedia: {
				type: Array,
				optional: true,
			},

			"socialMedia.$": {
				type: Object,
				optional: true,
			},

			"socialMedia.$.name": {
				type: String,
				optional: true,
				label: "СоцНазва",
				min: 1,
				max: 20
			},

			"socialMedia.$.url": {
				type: String,
				optional: true,
				label: "Посилання",
				regEx: SimpleSchema.RegEx.Url
			},

			commentAboutPerson: {
				type: String,
				required: false,
				label: "Коментар про людину"
			},
			commentAboutComunication: {
				type: String,
				required: false,
				label: "Коментар по комунікації"
			},
			techStack: {
				type: Array,
				required: false,
				label: "Стек технологій"
			},
			"techStack.$": {
				type: String,
				required: false,
				label: "Стек технологій"
			},
			directions: {
				type: Array,
				required: false,
				label: "Стек технологій"
			},
			"directions.$": {
				type: String,
				required: false,
				label: "Стек технологій"
			},

		}).validate({
			techStack,
			directions,
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
		});

		Candidates.insert({
			techStack,
			directions,
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
		});
	},
	"findAllCandidates"() {
		return Candidates.find().fetch();
	},
	"findCandidatesByField"(field) {
		return Candidates.find({ directions: field }).fetch();
	},
	"findCandidatesByTechStack"(techStack) {
		techStack = techStack.toLowerCase();
		return Candidates.find({ techStack }).fetch();
	},
	"findCandidateById"(id) {
		return Candidates.find({ _id: id }).fetch();
	},
	"updateCandidatesDirections"(previousDirection, newDirection) {
		const query = {};
		query["directions.$"] = newDirection;
		Candidates.update({ directions: previousDirection }, { $set: query }, { multi: true });
		Meteor.call("setUndefinedDirection");
	},
	"deleteCandidatesDirection"(direction) {
		Candidates.update({}, { $pull: { directions: direction } }, { multi: true });
		Meteor.call("setUndefinedDirection");
	},
	"setUndefinedDirection"() {
		let array = Candidates.find({ $or: [{ directions: { $size: 0 } }, { directions: null }, { directions: "undefined" }] }).fetch();
		if (array.length > 0) {
			Candidates.update({ directions: { $size: 0 } }, { $push: { directions: "undefined" } }, { multi: true });
			Directions.update({ directions: { $exists: true } }, { $addToSet: { directions: "undefined" } });
		}
	}
});