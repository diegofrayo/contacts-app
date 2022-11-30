import { createNode } from "../utils/render.js";

// function People({ contacts }) {
// 	const Element = createNode({
// 		element: document.createElement("div"),
// 		className: "contacts",
// 		children: [
// 			createNode({
// 				element: document.createElement("ul"),
// 				children: contacts.map((person) => {
// 					const contact = createNode({
// 						element: document.createElement("li"),
// 						className: "person",
// 						children: [
// 							createNode({
// 								element: document.createElement("img"),
// 								props: {
// 									src: person.img,
// 								},
// 							}),
// 							createNode({
// 								element: document.createElement("div"),
// 								className: "person-info",
// 								children: [
// 									createNode({
// 										element: document.createElement("span"),
// 										className: "name",
// 										innerText: person.name,
// 									}),
// 									createNode({
// 										element: document.createElement("span"),
// 										className: "tel",
// 										innerText: person.tel,
// 									}),
// 								],
// 							}),
// 						],
// 					});

// 					return contact;
// 				}),
// 			}),
// 		],
// 	});

// 	return Element;
// }

function People({ contacts }) {
	const Element = document.createElement("div");
	Element.classList.add("contacts");
	Element.innerHTML += `
		<ul>
			${contacts
				.map((person) => {
					return `<li class="person">
					<img src=${person.img} />
					<div class="person-info">
						<span class="name">${person.name}</span>
						<span class="tel">${person.tel}</span>
					</div>
				</li>`;
				})
				.join("")}
		</ul>
	`;

	return Element;
}

export default People;
