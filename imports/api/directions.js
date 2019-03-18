import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";


export const Directions = new Mongo.Collection("directions");

Meteor.methods({
	"addDirection"(directions) {
		Directions.update({ directions: { $exists: true } }, { $addToSet: { directions } });
		return true;
	},
	"getAllDirections"() {
		return Directions.findOne({ directions: { $exists: true } },
			{ fields: { directions: 1 } });
	},
	"deleteDirection"(index, value) {
		const query = {};
		query[`directions.${index}`] = 1;
		Directions.update({}, { $unset: query });
		Directions.update({}, { $pull: { directions: null } });
		Meteor.call("deleteCandidatesDirection", value);

	},
	"updateDirection"(index, value) {
		const query = {};
		query[`directions.${index}`] = value;
		let previousValue = Directions.findOne({});

		if (previousValue.directions.some((direction) => direction === value)) {
			//don't know how to fix it
		} else {
			previousValue = previousValue.directions[index];

			Directions.update({}, { $set: query });
			Meteor.call("updateCandidatesDirections", previousValue, value);

		}


	}
});