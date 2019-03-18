import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Invitations } from "../api/invitations";
import { generatedToken } from "../utils/generateToken";

if (Meteor.isServer) {
	Meteor.methods({
		"invitations.insert"(email, role) {
			if (!this.userId) {
				throw new Meteor.Error("Не авторизований користувач не може надсилати запрошення");
			}

			removePreviousInvite(email);

			let token = generatedToken();

			let tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);

			new SimpleSchema({
				email: {
					type: String,
					label: "Емейл користувача",
					regEx: SimpleSchema.RegEx.Email
				},
				role: {
					type: String,
					label: "Роль",
					allowedValues: "admin,superAdmin,recruiter"
				}
			}).validate({ email, role });

  

			Invitations.insert({
				email,
				role,
				date: tomorrow,
				token
			});

			return { token, email };

		},

		"getUserRoleAndName"() {
			return Meteor.users.findOne({_id: this.userId}, {fields: {role: 1, name: 1}});               
		}

	});
}

export function removePreviousInvite(email) {

	if (Meteor.isServer) {
    
		Invitations.remove({ email });

	}
}



