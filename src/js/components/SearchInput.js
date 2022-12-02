import { createNode } from "../utils/render.js";

function SearchInput() {
	const Element = createNode({
		tag: "form",
		children: [
			createNode({
				tag: "input",
				className: "search-input",
				props: {
					type: "text",
				},
			}),
			createNode({
				tag: "button",
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

/*
const personContent = document.querySelector(".contacts ul"),
	submitBtn = document.querySelector("#btn-submit");

const search = document.querySelector("#search");

let value = "";

function submit(e) {
	e.preventDefault();
	let items = document.querySelectorAll(".contacts ul li");

	contacts.filter((person, i) => {
		if (person.name.toUpperCase().indexOf(value) > -1) {
			items[i].style.display = "";
		} else {
			items[i].style.display = "none";
		}
	});
	search.value = "";
}
}

search.addEventListener("keyup", () => {
	value = search.value.toUpperCase();
});

submitBtn.addEventListener("click", submit);
*/
