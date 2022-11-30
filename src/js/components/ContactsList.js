import { createNode } from "../utils/render.js";

function People({ contacts }) {
	const Element = createNode({
		tag: "div",
		className: "contacts",
	});

	Element.innerHTML += `
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
	`;

	return Element;
}

export default People;
