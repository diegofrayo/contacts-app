import * as React from "react";

import { useDidMount } from "~/hooks";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";
import { createContactAction, useDispatch } from "~/modules/state-management";

function CreateContactModal() {
	// hooks
	const dispatch = useDispatch();

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

		const form = event.target as HTMLFormElement;
		const newContact = {
			name: form["input-name"].value,
			instagram: form["input-instagram"].value,
			mail: form["input-mail"].value,
			tel: form["input-tel"].value,
			whatsApp: form["input-whatsapp"].value,
		};

		dispatch(createContactAction(await Contacts.create(newContact)));
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
					<div className="CreateContactModal__content__form__box">
						<label
							className="CreateContactModal__content__form__box__label"
							htmlFor="input-name"
						>
							Name: (*)
						</label>
						<input
							id="input-name"
							name="input-name"
							type="text"
							className="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--name"
							placeholder="Name"
							onInvalid={function onInvalid(event) {
								event.currentTarget.setCustomValidity("This field is required");
							}}
							onChange={function onChange(event) {
								event.currentTarget.setCustomValidity("");
							}}
							required
						/>
					</div>
					<div className="CreateContactModal__content__form__box">
						<label
							className="CreateContactModal__content__form__box__label"
							htmlFor="input-tel"
						>
							Telephone:
						</label>
						<input
							id="input-tel"
							name="input-tel"
							type="tel"
							className="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--tel"
							placeholder="Telephone"
						/>
					</div>
					<div className="CreateContactModal__content__form__box fw-col-span-full">
						<label
							className="CreateContactModal__content__form__box__label"
							htmlFor="input-instagram"
						>
							Instagram:
						</label>
						<input
							id="input-instagram"
							name="input-instagram"
							type="text"
							className="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--instagram"
							placeholder="Instagram"
						/>
					</div>
					<div className="CreateContactModal__content__form__box fw-col-span-full">
						<label
							className="CreateContactModal__content__form__box__label"
							htmlFor="input-whatsapp"
						>
							Whatsapp:
						</label>
						<input
							id="input-whatsapp"
							name="input-whatsapp"
							type="tel"
							className="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--whatsapp"
							placeholder="WhatsApp"
						/>
					</div>
					<div className="CreateContactModal__content__form__box fw-col-span-full">
						<label
							className="CreateContactModal__content__form__box__label"
							htmlFor="input-mail"
						>
							Mail:
						</label>
						<input
							id="input-mail"
							name="input-mail"
							type="email"
							className="CreateContactModal__content__form__box__input CreateContactModal__content__form__box__input--mail"
							placeholder="Mail"
						/>
					</div>
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
