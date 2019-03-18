import { Email } from "meteor/email";

export function sendInvite(token, email) {
	Email.send({
		to: email,
		from: "development2728@gmail.com",
		subject: "Реєстрація в Recruiter App",
		text: "Ви запрошені приєднатися до recruiter-app, перейдіть" +
        `за посиланням для реєстрації \n http://localhost:3000/signup/${token}`
	});
  
}


