import classNames from "classnames";

import Contacts from "~/data/contacts";
import Ryakt from "~/lib/ryakt";
import v from "~/lib/validator";
import EventsManager from "~/utils/events-manager";

function ContactsList() {
	EventsManager.addEventListener(
		EventsManager.ON_INPUT_SEARCH_CHANGE,
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
				.map((person) => {
					const showDetails =
						v.isNotEmptyString(person.twitter) ||
						v.isNotEmptyString(person.instagram) ||
						v.isNotEmptyString(person.whatsApp) ||
						v.isNotEmptyString(person.mail);

					return `
						<li class="ContactsList__list__item">
							<details class="fw-w-full">
								<summary class="${classNames(
									"ContactsList__list__item__header",
									showDetails && "fw-cursor-pointer",
								)}">
									<img class="ContactsList__list__item__header__avatar" src=${person.avatar} />
									<div class="ContactsList__list__item__header__details">
										<span class="ContactsList__list__item__header__details__name">${person.name}</span>
										${
											v.isNotEmptyString(person.tel)
												? Ryakt.createElement(
														"a",
														{
															href: `tel:${person.tel}`,
															className: "ContactsList__list__item__header__details__tel",
															onClick: [
																".ContactsList__list__item__header__details__tel",
																handleTelClick,
															],
														},
														[person.tel],
												  )
												: ""
										}
									<button class="fw-absolute fw-top-1 fw-right-1 fw-p-1 fw-font-bold">
										x
									</button>
									</div>
								</summary>
								<div class="${classNames(
									"ContactsList__list__item__extra-info",
									showDetails ? "fw-block" : "fw-hidden",
								)}">
									${
										v.isNotEmptyString(person.twitter)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Twitter:</b> <a href="https://twitter.com/${person.twitter}" target="_blank">@${person.twitter}</a>
											</p>`
											: ""
									}
									${
										v.isNotEmptyString(person.instagram)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Instagram:</b> <a href="https://instagram.com/${person.instagram}" target="_blank">@${person.instagram}</a>
											</p>`
											: ""
									}
									${
										v.isNotEmptyString(person.whatsApp)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>WhatsApp:</b> <a href="https://api.whatsapp.com/send?phone=&${person.whatsApp}&text=Hi" target="_blank">${person.whatsApp}</a>
											</p>`
											: ""
									}
									${
										v.isNotEmptyString(person.mail)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Mail</b>: <a href="mailto:${person.mail}" target="_blank">${person.mail}</a>
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

	document.querySelectorAll(".ContactsList")[0].innerHTML = children;
}
