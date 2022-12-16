import Separator from "~/components/Separator";
import { ASSETS_PATH } from "~/config";
import Ryakt from "~/lib/ryakt";
import v from "~/lib/validator";
import Contacts from "~/modules/data/contacts";
import EventsManager, { T_RefreshContactsListPayload } from "~/modules/events-manager";
import { getTargetElement } from "~/utils";

function ContactsList() {
	return Ryakt.createElement("div", { className: "ContactsList" }, [], {
		didMount: function ContactsListDidMount() {
			EventsManager.addEventListener<T_RefreshContactsListPayload>(
				EventsManager.events.REFRESH_CONTACTS_LIST,
				async function refreshContactsList(payload) {
					renderContacts(payload);
				},
			);

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
					const contactHasDetails =
						v.isNotEmptyString(contact.instagram) ||
						v.isNotEmptyString(contact.whatsApp) ||
						v.isNotEmptyString(contact.mail);

					return `
						<li class="ContactsList__list__item">
							<details class="fw-w-full">
								<summary class="ContactsList__list__item__header">
									<img class="ContactsList__list__item__header__avatar" src="${ASSETS_PATH}/images/avatar.svg" />
									<div class="ContactsList__list__item__header__details">
										<span class="ContactsList__list__item__header__details__toggle-icon">❯</span>
										<p class="ContactsList__list__item__header__details__name">${contact.name}</p>
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
									</div>
								</summary>
								<div class="ContactsList__list__item__extra-info">
									<div>
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
													<b>WhatsApp:</b> <a href="${contact.getWhatsAppLink()}" target="_blank" rel="noreferrer">${
														contact.whatsApp
												  }</a>
												</p>`
												: ""
										}
										${
											v.isNotEmptyString(contact.mail)
												? `
												<p class="ContactsList__list__item__extra-info__item">
													<b>Mail</b>: <a href="mailto:${contact.mail}" target="_blank" rel="noreferrer">${contact.mail}</a>
												</p>`
												: ""
										}
									</div>
									${contactHasDetails ? Separator({ size: 1 }) : ""}
									<div class="fw-flex fw-items-center fw-justify-end">
										<button class="ContactsList__list__item__extra-info__delete-btn fw-p-1 fw-font-bold fw-text-red-600" data-contact-id="${
											contact.id
										}">delete</button>
									</div>
								</div>
							</details>
						</li>
					`;
				})
				.join("")}
		</ul>
	`;

	const $contactListContainer = document.querySelector(".ContactsList") as HTMLDivElement;
	$contactListContainer.innerHTML = children;
	$contactListContainer
		.querySelectorAll(".ContactsList__list__item__extra-info__delete-btn")
		.forEach((element) => {
			element.addEventListener("click", async function handleDeleteContactClick(event: Event) {
				const contactId =
					getTargetElement<HTMLButtonElement>(event).getAttribute("data-contact-id") || "";

				await Contacts.deleteById(contactId);

				renderContacts();
			});
		});
}
