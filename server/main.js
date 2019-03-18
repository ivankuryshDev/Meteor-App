import { Meteor } from "meteor/meteor";
import "../imports/api/files";
import "../imports/startup/invitations";
import "../imports/api/invitations";
import "../imports/startup/sendEmails";
import "../imports/api/users";
import "../imports/api/candidates";
import "../imports/startup/simpl-schema-configuration";
import {MAIL_URL} from "../env.variables/env.variables";

if (Meteor.isServer) {
	Meteor.startup( function() {
		process.env.MAIL_URL = MAIL_URL;
	});
}
