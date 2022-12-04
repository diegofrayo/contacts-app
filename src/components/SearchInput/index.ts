import { createElement, createComponent } from "../../utils/render";

function SearchInput() {
	const Element = createElement({
		element: "form",
		children: [
			createElement({
				element: "input",
				className: "search-input",
				props: {
					type: "text",
					placeholder: "Search",
				},
			}),
		],
	});

	return Element;
}

export default createComponent(SearchInput);

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
