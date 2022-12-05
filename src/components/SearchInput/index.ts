import Ryakt from "../../lib/Ryakt";

function SearchInput() {
	const Element = Ryakt.createElement("form", null, [
		Ryakt.createElement("input", {
			className: "search-input",
			type: "text",
			placeholder: "Search",
		}),
	]);

	return Element;
}

export default SearchInput;
