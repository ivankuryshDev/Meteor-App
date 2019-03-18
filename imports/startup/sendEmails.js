import { Meteor } from "meteor/meteor";

import { sendInvite } from "../sendEmails/sendInvites";


Meteor.methods({
	"invitations.sendInvite"(token, email) {
		if (!this.userId) {
			throw new Meteor.Error("Не авторизований користувач не може надсилати запрошення");
		}
		sendInvite(token, email);
	}
});





