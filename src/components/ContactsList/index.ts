import { T_Contact } from "../../types";
import Ryakt from "../../lib/ryakt";

function ContactsList({ contacts }: { contacts: T_Contact[] }) {
	function handleTelClick(event: Event): void {
		event.stopPropagation();
	}

	const children = `
		<ul class="contact__list">
			${contacts
				.map((person) => {
					return `
						<li class="contact__list__item">
							<details class="fw-w-full">
								<summary class="contact__list__item__header">
									<img class="contact__list__item__header__avatar" src=${person.avatar} />
									<div class="contact__list__item__header__details">
										<span class="contact__list__item__header__details__name">${person.name}</span>
										${
											person.tel
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
								<div class="contact__list__item__extra-info">
									${
										person.twitter
											? `
											<p class="contact__list__item__extra-info__item">
												<b>Twitter:</b> <a href="https://twitter.com/${person.twitter}" target="_blank">@${person.twitter}</a>
											</p>`
											: ""
									}
									${
										person.instagram
											? `
											<p class="contact__list__item__extra-info__item">
												<b>Instagram:</b> <a href="https://instagram.com/${person.instagram}" target="_blank">@${person.instagram}</a>
											</p>`
											: ""
									}
									${
										person.whatsApp
											? `
											<p class="contact__list__item__extra-info__item">
												<b>WhatsApp:</b> <a href="https://api.whatsapp.com/send?phone=&${person.whatsApp}&text=Hi" target="_blank">${person.whatsApp}</a>
											</p>`
											: ""
									}
									${
										person.mail
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
