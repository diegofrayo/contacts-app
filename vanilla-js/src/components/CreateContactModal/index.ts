import Ryakt from "~/lib/ryakt";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";
import { getTargetElement } from "~/utils";

function CreateContactModal() {
	// handlers
	async function onSubmitHandler(event: Event) {
		event.preventDefault();
		const form = getTargetElement<HTMLFormElement>(event);
		if(form["contact-name"].value){
			const newContact = {
				id: "",
				name: form["contact-name"].value,
				instagram: form["instagram"].value,
				mail: form["mail"].value,
				tel: form["tel"].value,
				whatsapp: form["whatsapp"].value,
			};
			await Contacts.create(newContact);
			EventsManager.dispatchEvent(EventsManager.events.REFRESH_CONTACTS_LIST, "");
			handleCloseClick();
			form.reset();
		} else {
			alert('Please fill in your name on the form')
		}
	}

	function handleCloseClick(): void {
		document.querySelector(".CreateContactModal")?.classList.remove("show");
	}

	const children = `
		<div class="CreateContactModal__content">
			<button class="CreateContactModal__content__close-btn">x</button>
			<h2 class="CreateContactModal__content__title">Add Contact</h2>
			<form name="create-contact-form" class="CreateContactModal__content__form">
				<div class="CreateContactModal__content__form__box">
					<label for="contact-name">Name:</label>
					<input name="contact-name" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--name" placeholder="Name" />			
				</div>
				<input name="avatar" type="file" hidden />
				<div class="CreateContactModal__content__form__box">
					<label for="contact-name">Telephone:</label>
					<input name="tel" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--tel" placeholder="Telephone" />
				</div>
				<div class="CreateContactModal__content__form__box gc-full">
					<label for="contact-name">Instagram:</label>
					<input name="instagram" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--instagram" placeholder="Instagram" />
				</div>
				<div class="CreateContactModal__content__form__box gc-full">
					<label for="contact-name">Whatsapp:</label>
					<input name="whatsapp" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--whatsapp" placeholder="WhatsApp" />
				</div>
				<div class="CreateContactModal__content__form__box gc-full">
					<label for="contact-name">Mail:</label>
					<input name="mail" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--mail" placeholder="Mail" />
				</div>
				<button name="submit" class="CreateContactModal__content__form__submit-btn" type="submit">Create</button>
			</form>
		</div>
	`;

	return Ryakt.createElement("div", { className: "CreateContactModal" }, [children], {
		didMount: function CreateContactModalDidMount() {
			EventsManager.addEventListener(
				EventsManager.events.SHOW_CREATE_CONTACT_MODAL,
				async function showCreateContactModal() {
					document.querySelector(".CreateContactModal")?.classList.add("show");
				},
			);
		},
		DOMEventsListeners: [
			["click", ".CreateContactModal__content__close-btn", handleCloseClick],
			["submit", ".CreateContactModal__content__form", onSubmitHandler],
		],
	});
}

export default CreateContactModal;
