import { Meteor } from "meteor/meteor";
import history from "../utils/history";
import React from "react";
import "../client/app.css";
import { Router, Route, Switch } from "react-router-dom";
import Signup from "../ui/Signup";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";
import Home from "../ui/Home/Home";
import NonFunctional from "../ui/NonFunctional";
import Header from "../ui/Header";
import Setting from "../ui/Setting";
import Admin from "../ui/adminsPanel/admin";
import SendResetPassword from "../ui/SendResetPassword";
import NewCandidate from "../ui/candidate_components/newCandidate";
import EditCandidate from "../ui/editCandidate";
import ResetPassword from "../ui/ResetPassword";
import Field from "../ui/Field";


const onEnterPublicPage = (Component, props) => {
	if (Meteor.userId()) {
		return <Home />;
	} else {
		return <Component {...props} />;
	}
};

const onEnterPrivatePage = (Component, props) => {
	if (Meteor.userId()) {
		return <Component {...props} />;
	} else {
		return <Login />;

	}
};

const unauthenticatedPages = ["/login", "/signup","/reset_password"];
const authenticatedPages = ["/","/nonFunctional","/admin"];

export const onAuthChange = (isAuthenticated) => {
	const pathName = location;

	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
	const isAuthenticatedPage = authenticatedPages.includes(pathName);

	if (isAuthenticated) {
		if (isUnauthenticatedPage) {
			history.push("/");
		}
	} else {
		if (isAuthenticatedPage) {
			history.push("/login");
		}
	}
};

export const routes = () => (
	<Router history={history}>
		<div>
			<Header />
			<Switch>
				<Route exact path="/reset/:token" render={(props) => onEnterPublicPage(ResetPassword, props)} />
				<Route exact path="/login" render={() => onEnterPublicPage(Login)} />
				<Route exact path="/password_reset" render={() => onEnterPublicPage(SendResetPassword)} />
				<Route exact path="/admin" render={() => onEnterPrivatePage(Admin)} />
				<Route path="/signup/:token" render={(props) => onEnterPublicPage(Signup, props)} />
				<Route exact path="/" render={() => onEnterPrivatePage(Home)} />
				<Route exact path="/nonFunctional" render={() => onEnterPrivatePage(NonFunctional)} />
				<Route exact path="/setting" render={() => onEnterPrivatePage(Setting)} />
				<Route exact path="/new_candidate" render={() => onEnterPrivatePage(NewCandidate)} />
				<Route path="/edit_candidate/:id" render={(props) => onEnterPrivatePage(EditCandidate, props)} />
				<Route path="/field/:field" render={(props) => onEnterPrivatePage(Field, props)} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);
