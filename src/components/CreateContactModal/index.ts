import Ryakt from "~/lib/ryakt";
import Contacts from "~/data/contacts";
import type { T_Contact } from "../../data/contacts/model";
import { renderContacts } from "../ContactsList";
 
function CreateContactModal() {

	let contact: T_Contact = {
		avatar : "",
		id: "",
		instagram: "",
		mail: "",
		name: "",
		tel: "",
		twitter: "",
		whatsApp: ""
	}

	function insertValue(e: Event){
		let target = e.target as HTMLInputElement;;  
		 contact = {
			avatar : target.value,
			id:  target.value,
			instagram:  target.value,
			mail:  target.value,
			name: target.value,
			tel:  target.value,
			twitter:  target.value,
			whatsApp:  target.value
		}
	}

	  async function onSubmitHandler(e: Event) {
		e.preventDefault();
		Contacts.create(contact);  
		await Contacts.getAll(); 
		renderContacts(); 
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
				<input id="name" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--name" placeholder="Name" />
				<input id="avatar" type="file" hidden />
				<input id="tel" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--tel" placeholder="Telephone" />
				<input id="instagram" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--instagram" placeholder="Instagram" />
				<input id="whatsapp" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--whatsapp" placeholder="WhatsApp" />
				<input id="mail" type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--mail" placeholder="Mail" />	
				<button id="submit" class="CreateContactModal__content__form__submit-btn" type="submit">Create</button>
			</form>
		</div>
	`;

	return Ryakt.createElement("div", { className: "CreateContactModal" }, [children], {
		DOMEventsListeners: [["click", ".CreateContactModal__content__close-btn", handleCloseClick], 
			["click", ".CreateContactModal__content__close-btn", handleCloseClick],
			["submit", ".CreateContactModal__content__form", onSubmitHandler],
			["keyup", ".CreateContactModal__content__form__input", insertValue]
		],
	});
}

export default CreateContactModal;

 