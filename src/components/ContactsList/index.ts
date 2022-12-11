import classNames from "classnames";

import Contacts from "~/data/contacts";
import Ryakt from "~/lib/ryakt";
import v from "~/lib/validator";
import EventsManager from "~/utils/events-manager";

function ContactsList() {
	EventsManager.addEventListener(
		EventsManager.REFRESH_CONTACTS_LIST,
		async function onInputSearchChange(event: CustomEvent<string>) {
			renderContacts(event.detail);
		},
	);

	return Ryakt.createElement("div", { className: "ContactsList" }, [], {
		didMount: function ContactsListDidMount() {
			renderContacts();
		},
	});
}

export default ContactsList;

// --- Utils ---

async function renderContacts(filter?: string) {
	// vars
	const contacts = await Contacts.getAll();

	// handlers
	function handleTelClick(event: Event): void {
		event.stopPropagation();
	}

	// utils
	function filterContacts() {
		if (v.isNotEmptyString(filter)) {
			return contacts.filter((contact) => {
				return (
					contact.name.toLowerCase().includes(filter.toLowerCase()) ||
					(contact.tel || "").toLowerCase().includes(filter.toLowerCase())
				);
			});
		}

		return contacts;
	}

	const children = `
		<ul class="ContactsList__list">
			${filterContacts()
				.map((contact) => {
					const showDetails =
						v.isNotEmptyString(contact.instagram) ||
						v.isNotEmptyString(contact.whatsApp) ||
						v.isNotEmptyString(contact.mail);

					return `
						<li class="ContactsList__list__item">
							<details class="fw-w-full">
								<summary class="${classNames(
									"ContactsList__list__item__header",
									showDetails && "fw-cursor-pointer",
								)}">
									<img class="ContactsList__list__item__header__avatar" src="assets/images/avatar.svg" />
									<div class="ContactsList__list__item__header__details">
										<span class="ContactsList__list__item__header__details__name">${contact.name}</span>
										${
											v.isNotEmptyString(contact.tel)
												? Ryakt.createElement(
														"a",
														{
															href: `tel:${contact.tel}`,
															className: "ContactsList__list__item__header__details__tel",
															onClick: [
																".ContactsList__list__item__header__details__tel",
																handleTelClick,
															],
														},
														[contact.tel],
												  )
												: ""
										}
									<button class="ContactsList__list__item__header__delete-btn fw-absolute fw-top-1 fw-right-1 fw-p-1 fw-font-bold" data-contact-id="${
										contact.id
									}">
										x
									</button>
									</div>
								</summary>
								<div class="${classNames(
									"ContactsList__list__item__extra-info",
									showDetails ? "fw-block" : "fw-hidden",
								)}">
									${
										v.isNotEmptyString(contact.instagram)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Instagram:</b> <a href="https://instagram.com/${contact.instagram}" target="_blank">@${contact.instagram}</a>
											</p>`
											: ""
									}
									${
										v.isNotEmptyString(contact.whatsApp)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>WhatsApp:</b> <a href="https://api.whatsapp.com/send?phone=&${contact.whatsApp}&text=Hi" target="_blank">${contact.whatsApp}</a>
											</p>`
											: ""
									}
									${
										v.isNotEmptyString(contact.mail)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Mail</b>: <a href="mailto:${contact.mail}" target="_blank">${contact.mail}</a>
											</p>`
											: ""
									}
								</div>
							</details>
						</li>
					`;
				})
				.join("")}
		</ul>
	`;

	// TODO: [Diego] Read this (https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional#:~:text=The%20error%20%22The%20left%2Dhand,as%20a%20type%20guard%20instead.)
	document.querySelector(".ContactsList")!.innerHTML = children;
	document.querySelectorAll(".ContactsList__list__item__header__delete-btn").forEach((element) => {
		element.addEventListener("click", async function handleDeleteContactClick(event: Event) {
			// TODO: [Diego] it's possible to avoid this "as"
			const contactId =
				(event.currentTarget as HTMLButtonElement).getAttribute("data-contact-id") || "";

			await Contacts.deleteById(contactId);

			renderContacts();
		});
	});
}
