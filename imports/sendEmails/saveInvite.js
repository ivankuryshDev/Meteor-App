import { Meteor } from "meteor/meteor";

export function saveManyInvites(request) {

	for (let i = 0; i < request.length; i++) {
		let email = request[i].email;
		let role = request[i].role;

		Meteor.call("invitations.insert", email, role, (error, result) => {
			if(result){
				Meteor.call("invitations.sendInvite", result.token, result.email);
			}
			
		});
	}

}

