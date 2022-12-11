import Ryakt from "~/lib/ryakt";
import Contacts from "~/data/contacts";
import EventsManager from "~/utils/events-manager";
import type { T_Contact } from "~/data/contacts/model";

function CreateContactModal() {
	let contact: T_Contact = {
		id: "",
		name: "",
		tel: "",
		avatar: "",
		instagram: "",
		mail: "",
		twitter: "",
		whatsApp: "",
	};

	function onFormInputKeyUpHandler(event: Event) {
		let target = event.target as HTMLInputElement;

		contact = {
			id: "",
			avatar: target.value,
			instagram: target.value,
			mail: target.value,
			name: target.value,
			tel: target.value,
			twitter: target.value,
			whatsApp: target.value,
		};
	}

	async function onSubmitHandler(event: Event) {
		event.preventDefault();
		await Contacts.create(contact);
		await Contacts.getAll();
		EventsManager.dispatchEvent(EventsManager.REFRESH_CONTACTS_LIST, "");
		handleCloseClick();
	}

	function handleCloseClick(): void {
		// TODO: [Diego] Use EventManager to accomplish this
		document.querySelector(".CreateContactModal")?.classList.remove("show");
	}

	const children = `
		<div class="CreateContactModal__content">
			<button class="CreateContactModal__content__close-btn">x</button>
			<h2 class="CreateContactModal__content__title">Add Contact</h2>
			<form class="CreateContactModal__content__form">
				<input name="name" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--name" placeholder="Name" />
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
			["keyup", ".CreateContactModal__content__form__input", onFormInputKeyUpHandler],
		],
	});
}

export default CreateContactModal;
