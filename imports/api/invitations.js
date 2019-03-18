import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Invitations = new Mongo.Collection("invitations");

Meteor.methods({
	"findByToken"(token) {
    
		let invitation = Invitations.findOne({ token },{fields:{token:1,date:1,_id:0,email:1}});
   
		if(invitation && invitation.date>Date.now()){
			return invitation;
		}
   
	},
	"findInvitationByEmail"(email){
		let invitation = Invitations.findOne({ email });
		if(invitation && invitation.date>Date.now()){
			return invitation;
		}
	},
	"removeInvitationByEmail"(email) {
		Invitations.remove({ email });
	}
});












