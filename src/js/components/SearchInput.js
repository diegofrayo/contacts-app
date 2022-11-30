import { createNode } from "../utils/render.js";

function SearchInput() {
	const Element = createNode({
		element: document.createElement("form"),
		children: [
			createNode({
				element: document.createElement("input"),
				className: "search-input",
				props: {
					type: "text",
				},
			}),
			createNode({
				element: document.createElement("button"),
				className: "submit-btn",
				innerText: "Submit",
				props: {
					type: "button",
				},
			}),
		],
	});

	return Element;
}

export default SearchInput;
