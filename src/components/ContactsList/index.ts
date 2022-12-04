import { T_Contact } from "../../types";
import { createComponent } from "../../utils/render";

function ContactsList({ contacts }: { contacts: T_Contact[] }) {
	const html = `
		<div class="contacts">
			<ul>
				${contacts
					.map((person) => {
						return `
							<li class="person">
								<img src=${person.img} />
								<div class="person-info">
									<span class="name">${person.name}</span>
									<span class="tel">${person.tel}</span>
								</div>
							</li>
						`;
					})
					.join("")}
			</ul>
		</div>
	`;

	return html;
}

export default createComponent(ContactsList);
