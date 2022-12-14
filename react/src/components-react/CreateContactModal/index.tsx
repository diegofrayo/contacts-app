import * as React from "react";

import { useDidMount } from "~/hooks";
import Contacts, { T_ContactObject } from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";

function CreateContactModal() {
	// effects
	useDidMount(() => {
		EventsManager.addEventListener(
			EventsManager.events.SHOW_CREATE_CONTACT_MODAL,
			async function showCreateContactModal() {
				document.querySelector(".CreateContactModal")?.classList.add("show");
			},
		);
	});

	// handlers
	async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.target as HTMLFormElement & {
			name: { value: T_ContactObject["name"] };
			instagram: { value: T_ContactObject["instagram"] };
			mail: { value: T_ContactObject["mail"] };
			tel: { value: T_ContactObject["tel"] };
			whatsApp: { value: T_ContactObject["whatsApp"] };
		};

		const newContact = {
			name: form["name"].value,
			instagram: form["instagram"].value,
			mail: form["mail"].value,
			tel: form["tel"].value,
			whatsApp: form["whatsApp"].value,
		};

		await Contacts.create(newContact);
		EventsManager.dispatchEvent(EventsManager.events.REFRESH_CONTACTS_LIST, "");
		handleCloseClick();
		form.reset();
	}

	function handleCloseClick(): void {
		document.querySelector(".CreateContactModal")?.classList.remove("show");
	}

	return (
		<div className="CreateContactModal">
			<div className="CreateContactModal__content">
				<button
					className="CreateContactModal__content__close-btn"
					onClick={handleCloseClick}
				>
					x
				</button>
				<h2 className="CreateContactModal__content__title">Add Contact</h2>
				<form
					name="create-contact-form"
					className="CreateContactModal__content__form"
					onSubmit={onSubmitHandler}
				>
					<input
						name="name"
						type="text"
						className="CreateContactModal__content__form__input CreateContactModal__content__form__input--name"
						placeholder="Name"
					/>
					<input
						name="avatar"
						type="file"
						hidden
					/>
					<input
						name="tel"
						type="text"
						className="CreateContactModal__content__form__input CreateContactModal__content__form__input--tel"
						placeholder="Telephone"
					/>
					<input
						name="instagram"
						type="text"
						className="CreateContactModal__content__form__input CreateContactModal__content__form__input--instagram"
						placeholder="Instagram"
					/>
					<input
						name="whatsApp"
						type="text"
						className="CreateContactModal__content__form__input CreateContactModal__content__form__input--whatsapp"
						placeholder="WhatsApp"
					/>
					<input
						name="mail"
						type="text"
						className="CreateContactModal__content__form__input CreateContactModal__content__form__input--mail"
						placeholder="Mail"
					/>
					<button
						name="submit"
						className="CreateContactModal__content__form__submit-btn"
						type="submit"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateContactModal;
