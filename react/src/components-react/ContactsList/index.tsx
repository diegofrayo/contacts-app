import * as React from "react";

import Separator from "~/components-react/Separator";
import { ASSETS_PATH } from "~/config";
import { useDidMount } from "~/hooks";
import v from "~/lib/validator";
import Contacts, { T_Contact } from "~/modules/data/contacts";
import EventsManager, { T_RefreshContactsListPayload } from "~/modules/events-manager";
import type { T_ReactOnClickEventObject } from "~/types";

function ContactsList() {
	// states & refs
	const [contacts, setContacts] = React.useState<T_Contact[]>([]);

	// effects
	useDidMount(() => {
		EventsManager.addEventListener<T_RefreshContactsListPayload>(
			EventsManager.events.REFRESH_CONTACTS_LIST,
			async function refreshContactsList(filter) {
				updateContacts(filter);
			},
		);

		updateContacts();
	});

	// handlers
	function handleTelClick(event: T_ReactOnClickEventObject<HTMLAnchorElement>): void {
		event.stopPropagation();
	}

	async function handleDeleteContactClick(event: T_ReactOnClickEventObject<HTMLButtonElement>) {
		const contactId = event.currentTarget.getAttribute("data-contact-id") || "";

		await Contacts.deleteById(contactId);

		updateContacts();
	}

	// utils
	async function updateContacts(filter?: string) {
		let contacts = await Contacts.getAll();

		if (v.isNotEmptyString(filter)) {
			contacts = contacts.filter((contact) => {
				return (
					contact.name.toLowerCase().includes(filter.toLowerCase()) ||
					(contact.tel || "").toLowerCase().includes(filter.toLowerCase())
				);
			});
		}

		setContacts(contacts);
	}

	return (
		<div className="ContactsList">
			<ul className="ContactsList__list">
				{contacts.map((contact) => {
					const contactHasDetails =
						v.isNotEmptyString(contact.instagram) ||
						v.isNotEmptyString(contact.whatsApp) ||
						v.isNotEmptyString(contact.mail);

					return (
						<li
							key={contact.id}
							className="ContactsList__list__item"
						>
							<details className="fw-w-full">
								<summary className="ContactsList__list__item__header">
									<img
										className="ContactsList__list__item__header__avatar"
										src={`${ASSETS_PATH}/images/avatar.svg`}
										alt="Avatar icon"
									/>
									<div className="ContactsList__list__item__header__details">
										<span className="ContactsList__list__item__header__details__toggle-icon">
											❯
										</span>
										<p className="ContactsList__list__item__header__details__name">
											{contact.name}
										</p>
										{v.isNotEmptyString(contact.tel) ? (
											<a
												href={`tel:${contact.tel}`}
												target="_blank"
												rel="noreferrer"
												className="ContactsList__list__item__header__details__tel"
												onClick={handleTelClick}
											>
												{contact.tel}
											</a>
										) : null}
									</div>
								</summary>
								<div className="ContactsList__list__item__extra-info">
									<div>
										{v.isNotEmptyString(contact.instagram) ? (
											<p className="ContactsList__list__item__extra-info__item">
												<b>Instagram:</b>{" "}
												<a
													href={`https://instagram.com/${contact.instagram}`}
													target="_blank"
													rel="noreferrer"
												>
													@{contact.instagram}
												</a>
											</p>
										) : null}
										{v.isNotEmptyString(contact.whatsApp) ? (
											<p className="ContactsList__list__item__extra-info__item">
												<b>WhatsApp:</b>{" "}
												<a
													href={contact.getWhatsAppLink()}
													target="_blank"
													rel="noreferrer"
												>
													{contact.whatsApp}
												</a>
											</p>
										) : null}
										{v.isNotEmptyString(contact.mail) ? (
											<p className="ContactsList__list__item__extra-info__item">
												<b>Mail</b>:{" "}
												<a
													href="mailto:${contact.mail}"
													target="_blank"
													rel="noreferrer"
												>
													{contact.mail}
												</a>
											</p>
										) : null}
									</div>
									{contactHasDetails ? <Separator size={1} /> : null}
									<div className="fw-flex fw-items-center fw-justify-end">
										<button
											className="ContactsList__list__item__extra-info__delete-btn fw-p-1 fw-font-bold fw-text-red"
											data-contact-id={contact.id}
											onClick={handleDeleteContactClick}
										>
											delete
										</button>
									</div>
								</div>
							</details>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ContactsList;
