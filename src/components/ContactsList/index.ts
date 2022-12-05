import classNames from "classnames";

import { isNotEmptyString } from "~/lib/validator";
import Ryakt from "~/lib/ryakt";
import type { T_Contact } from "~/types";

function ContactsList({ contacts }: { contacts: T_Contact[] }) {
	function handleTelClick(event: Event): void {
		event.stopPropagation();
	}

	const children = `
		<ul class="contact__list">
			${contacts
				.map((person) => {
					const showDetails =
						isNotEmptyString(person.twitter) ||
						isNotEmptyString(person.instagram) ||
						isNotEmptyString(person.whatsApp) ||
						isNotEmptyString(person.mail);

					return `
						<li class="contact__list__item">
							<details class="fw-w-full">
								<summary class="contact__list__item__header">
									<img class="contact__list__item__header__avatar" src=${person.avatar} />
									<div class="contact__list__item__header__details">
										<span class="contact__list__item__header__details__name">${person.name}</span>
										${
											isNotEmptyString(person.tel)
												? Ryakt.createElement(
														"a",
														{
															href: `tel:${person.tel}`,
															className: "contact__list__item__header__details__tel",
															onClick: [
																".contact__list__item__header__details__tel",
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
									"contact__list__item__extra-info",
									showDetails ? "fw-block" : "fw-hidden",
								)}">
									${
										isNotEmptyString(person.twitter)
											? `
											<p class="contact__list__item__extra-info__item">
												<b>Twitter:</b> <a href="https://twitter.com/${person.twitter}" target="_blank">@${person.twitter}</a>
											</p>`
											: ""
									}
									${
										isNotEmptyString(person.instagram)
											? `
											<p class="contact__list__item__extra-info__item">
												<b>Instagram:</b> <a href="https://instagram.com/${person.instagram}" target="_blank">@${person.instagram}</a>
											</p>`
											: ""
									}
									${
										isNotEmptyString(person.whatsApp)
											? `
											<p class="contact__list__item__extra-info__item">
												<b>WhatsApp:</b> <a href="https://api.whatsapp.com/send?phone=&${person.whatsApp}&text=Hi" target="_blank">${person.whatsApp}</a>
											</p>`
											: ""
									}
									${
										isNotEmptyString(person.mail)
											? `
											<p class="contact__list__item__extra-info__item">
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

	return Ryakt.createElement("div", { className: "contact" }, [children]);
}

export default ContactsList;
