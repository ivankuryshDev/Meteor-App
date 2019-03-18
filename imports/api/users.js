/* eslint-disable no-console */
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Accounts } from "meteor/accounts-base";

if (Meteor.isServer) {

	Meteor.publish("users", function () {
		return Meteor.users.find();
	});

	Meteor.methods({

		deleteUser(_id) {
			const user = Meteor.users.findOne({ _id });
			if (user.role === "superAdmin") {
				console.log("This user is superAdmin");
			} else {
				Meteor.users.remove(_id);
			}
		},
		updateUsers(_id, name, secondEmail, role) {
			const user = Meteor.users.findOne({ _id });
			if (user.role === "superAdmin") {
				console.log("This user is superAdmin");
			} else {
				Meteor.users.update({ _id: _id }, { $set: { name, secondEmail, role } });
			}
		},
		getRoleForAdmin() {
			const user = Meteor.users.findOne({ _id: this.userId });
			return user.role;
		},
		findByResetToken(token) {
			const user = Meteor.users.find({ "services.password.reset.token": token }).fetch();
			if (user.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	});
}

Accounts.config({
	passwordResetTokenExpirationInDays: 1
});

Accounts.emailTemplates.resetPassword = {
	from: () => "development2728@gmail.com",
	subject: () => "Відновлення вашого паролю в Recruiter App",
	text: (user, url) => {
		const newUrl = url.replace("#/reset-password", "reset");
		return `Вітаю, перейшовши за посиланням нижче ви можете відновити свій пароль:\n${newUrl}`;
	}
};

if (Meteor.isServer) {
	Meteor.publish("user", function () {
		return Meteor.users.find({ _id: Accounts.userId() });
	});
	Meteor.methods({
		updateOneUser(name, secondEmail) {
			Meteor.users.update({ _id: Accounts.userId() }, { $set: { name, secondEmail } });
		}
	});
}

Accounts.onCreateUser(function (options, user) {
	const invitation = Meteor.call("findInvitationByEmail", options.email);

	const customizedUser = Object.assign({
		secondEmail: options.secondEmail,
		name: options.name,
		role: invitation.role
	}, user);
	return customizedUser;
});



Accounts.validateNewUser((user) => {

	const email = user.emails[0].address;
	const secondEmail = user.secondEmail;
	const name = user.name;
	const role = user.role;

	const Admin = new SimpleSchema({

		email: {
			index: true,
			unique: true,
			label: "Емейл",
			type: String,
			regEx: SimpleSchema.RegEx.Email
		},
		secondEmail: {
			index: true,
			unique: true,
			label: "Другий емейл",
			type: String,
			regEx: SimpleSchema.RegEx.Email
		},
		name: {
			label: "Ім'я",
			type: String,
			max: 50
		},
		role: {
			label: "Роль",
			type: String,
			allowedValues: ["admin", "recruiter"]
		}
	});

	Admin.validate({ email, secondEmail, name, role });

	Meteor.call("removeInvitationByEmail", email);

	return true;

});
