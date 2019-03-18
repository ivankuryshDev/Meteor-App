import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {

	if (error.message.indexOf("Ім'я") === 0) {
		return new Meteor.Error(400, "Ім'я повинно бути довжиною мінімум 2 символ, максимум 50 символів!");
	} else if (error.message.indexOf("Прізвище") === 0) {
		return new Meteor.Error(400, "Прізвище повинно бути довжиною мінімум 2 символ, максимум 50 символів!");
	} else if (error.message.indexOf("Пароль") === 0) {
		return new Meteor.Error(400, "Пароль повинен бути довжиною мінімум 6 символів і максимум 50 символів!");
	} else if (error.message.indexOf("Проживання") === 0) {
		return new Meteor.Error(400, "Поле Локація є обов'язковим");
	} else if (error.message.indexOf("Тип роботи") === 0) {
		return new Meteor.Error(400, "Не коректне значення у полі Тип роботи");
	} else if (error.message.indexOf("Графік роботи") === 0) {
		return new Meteor.Error(400, "Не коректне значення у полі Тип графіку");
	} else if (error.message.indexOf("Емейл") === 0) {
		return new Meteor.Error(400, "Некоректна пошта!");
	} else if (error.message.indexOf("Додатковий Емейл") === 0) {
		return new Meteor.Error(400, "Некоректний додатковий емейл!");
	} else if (error.message.indexOf("Телефон") === 0) {
		return new Meteor.Error(400, "Не коректне значення у полі телефон");
	} else if (error.message.indexOf("Другий телефон") === 0) {
		return new Meteor.Error(400, "Не коректне значення у полі другого телефону");
	} else if (error.message.indexOf("СоцНазва") === 0) {
		return new Meteor.Error(400, "Назва соц.мережі повиннна містити мінімум 1 символ, максимум 20");
	} else if (error.message.indexOf("Посилання") === 0) {
		return new Meteor.Error(400, "Не коректне посилання на соц.мережу");
	} else if (error.message.indexOf("Напрямки") === 0) {
		return new Meteor.Error(400, "Поле напрямку, по якиз спеціалізується дана людина повинне бути заповненим");
	} else if (error.message.indexOf("Проживання") === 0) {
		return new Meteor.Error(400, "Поле місця проживання людини повинне бути заповненим");
	} else if (error.message.indexOf("facebook") === 0) {
		return new Meteor.Error(400, "Не коректне посилання у полі Facebook");
	} else if (error.message.indexOf("twitter") === 0) {
		return new Meteor.Error(400, "Не коректне посилання у полі Twitter");
	} else if (error.message.indexOf("linkedin") === 0) {
		return new Meteor.Error(400, "Не коректне посилання у полі LinkedIn");
	} else {
		return new Meteor.Error(400, error.message);
	}

});