import Ryakt from "~/lib/ryakt";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";

function CreateContactModal() {
	// handlers
	async function onSubmitHandler(event: Event) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
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
	}

	function handleCloseClick(): void {
		// TODO: [Diego] Use EventManager to accomplish this
		document.querySelector(".CreateContactModal")?.classList.remove("show");
	}

	const children = `
		<div class="CreateContactModal__content">
			<button class="CreateContactModal__content__close-btn">x</button>
			<h2 class="CreateContactModal__content__title">Add Contact</h2>
			<form name="create-contact-form" class="CreateContactModal__content__form">
				<input name="contact-name" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--name" placeholder="Name" />
				<input name="avatar" type="file" hidden />
				<input name="tel" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--tel" placeholder="Telephone" />
				<input name="instagram" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--instagram" placeholder="Instagram" />
				<input name="whatsapp" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--whatsapp" placeholder="WhatsApp" />
				<input name="mail" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--mail" placeholder="Mail" />
				<button name="submit" class="CreateContactModal__content__form__submit-btn" type="submit">Create</button>
			</form>
		</div>
	`;

	return Ryakt.createElement("div", { className: "CreateContactModal" }, [children], {
		DOMEventsListeners: [
			["click", ".CreateContactModal__content__close-btn", handleCloseClick],
			["submit", ".CreateContactModal__content__form", onSubmitHandler],
		],
	});
}

export default CreateContactModal;
