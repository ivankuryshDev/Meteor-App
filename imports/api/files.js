/* eslint-disable no-console */
import UserFiles from "./uploadFile.js";
import { Meteor } from "meteor/meteor";

if (Meteor.isClient) {
	Meteor.subscribe("files.all");
}
  
if (Meteor.isServer) {
	Meteor.publish("files.all", function () {
		return UserFiles.find().cursor;
	});
}

Meteor.methods({

	"RemoveFile"(id) {
       
		UserFiles.remove({_id: id}, function (error) {
			if (error) {
				console.error("File wasn't removed, error: " + error.reason);
			} else {
				console.info("File successfully removed");
			}
		});

	},
    
});

