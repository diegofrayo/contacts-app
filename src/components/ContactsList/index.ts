import classNames from "classnames";

import CONTACTS from "~/data/contacts";
import Ryakt from "~/lib/ryakt";
import { isNotEmptyString } from "~/lib/validator";
import EventsManager from "~/utils/events-manager";

function ContactsList() {
	EventsManager.addEventListener(
		EventsManager.ON_INPUT_SEARCH_CHANGE,
		function onInputSearchChange(event: CustomEvent<string>) {
			document.querySelectorAll(".ContactsList")[0].innerHTML = renderContacts(event.detail);
		},
	);

	return Ryakt.createElement("div", { className: "ContactsList" }, [renderContacts()]);
}

export default ContactsList;

// --- Utils ---

function renderContacts(filter?: string) {
	// handlers
	function handleTelClick(event: Event): void {
		event.stopPropagation();
	}

	// utils
	function filterContacts() {
		if (isNotEmptyString(filter)) {
			return CONTACTS.filter((contact) => {
				return (
					contact.name.toLowerCase().includes(filter.toLowerCase()) ||
					(contact.tel || "").toLowerCase().includes(filter.toLowerCase())
				);
			});
		}

		return CONTACTS;
	}

	const children = `
		<ul class="ContactsList__list">
			${filterContacts()
				.map((person) => {
					const showDetails =
						isNotEmptyString(person.twitter) ||
						isNotEmptyString(person.instagram) ||
						isNotEmptyString(person.whatsApp) ||
						isNotEmptyString(person.mail);

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
											isNotEmptyString(person.tel)
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
									</div>
								</summary>
								<div class="${classNames(
									"ContactsList__list__item__extra-info",
									showDetails ? "fw-block" : "fw-hidden",
								)}">
									${
										isNotEmptyString(person.twitter)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Twitter:</b> <a href="https://twitter.com/${person.twitter}" target="_blank">@${person.twitter}</a>
											</p>`
											: ""
									}
									${
										isNotEmptyString(person.instagram)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>Instagram:</b> <a href="https://instagram.com/${person.instagram}" target="_blank">@${person.instagram}</a>
											</p>`
											: ""
									}
									${
										isNotEmptyString(person.whatsApp)
											? `
											<p class="ContactsList__list__item__extra-info__item">
												<b>WhatsApp:</b> <a href="https://api.whatsapp.com/send?phone=&${person.whatsApp}&text=Hi" target="_blank">${person.whatsApp}</a>
											</p>`
											: ""
									}
									${
										isNotEmptyString(person.mail)
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

	return children;
}
