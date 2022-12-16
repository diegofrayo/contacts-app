import Ryakt from "~/lib/ryakt";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";
import { getTargetElement } from "~/utils";

function CreateContactModal() {
	// handlers
	async function onSubmitHandler(event: Event) {
		event.preventDefault();

		const form = getTargetElement<HTMLFormElement>(event);
		const newContact = {
			id: "",
			name: form["input-name"].value,
			instagram: form["input-instagram"].value,
			mail: form["input-mail"].value,
			tel: form["input-tel"].value,
			whatsapp: form["input-whatsapp"].value,
		};

		await Contacts.create(newContact);
		EventsManager.instance.dispatchEvent(EventsManager.instance.events.REFRESH_CONTACTS_LIST, "");
		handleCloseClick();
		form.reset();
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
					<label class="CreateContactModal__content__form__box__label" for="input-name">Name: (*)</label>
					<input id="input-name" name="input-name" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--name" placeholder="Name" oninvalid="this.setCustomValidity('This field is required')" oninput="this.setCustomValidity('')" required />
				</div>
				<div class="CreateContactModal__content__form__box">
					<label class="CreateContactModal__content__form__box__label" for="input-tel">Telephone:</label>
					<input id="input-tel" name="input-tel" type="tel" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--tel" placeholder="Telephone" />
				</div>
				<div class="CreateContactModal__content__form__box tw-col-span-full">
					<label class="CreateContactModal__content__form__box__label" for="input-instagram">Instagram:</label>
					<input id="input-instagram" name="input-instagram" type="text" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--instagram" placeholder="Instagram" />
				</div>
				<div class="CreateContactModal__content__form__box tw-col-span-full">
					<label class="CreateContactModal__content__form__box__label" for="input-whatsapp">Whatsapp:</label>
					<input id="input-whatsapp" name="input-whatsapp" type="tel" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--whatsapp" placeholder="WhatsApp" />
				</div>
				<div class="CreateContactModal__content__form__box tw-col-span-full">
					<label class="CreateContactModal__content__form__box__label" for="input-mail">Mail:</label>
					<input id="input-mail" name="input-mail" type="email" class="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--mail" placeholder="Mail" />
				</div>
				<button name="submit" class="CreateContactModal__content__form__submit-btn" type="submit">Create</button>
			</form>
		</div>
	`;

	return Ryakt.createElement("div", { className: "CreateContactModal" }, [children], {
		didMount: function CreateContactModalDidMount() {
			EventsManager.instance.addEventListener(
				EventsManager.instance.events.SHOW_CREATE_CONTACT_MODAL,
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
