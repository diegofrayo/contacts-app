import Ryakt from "~/lib/ryakt";
import EventsManager from "~/modules/events-manager";
import { getTargetElement } from "~/utils";

function SearchInput() {
	const children = Ryakt.createElement("input", {
		className: "SearchInput__input",
		type: "text",
		placeholder: "Search",
		onKeyUp: [
			".SearchInput__input",
			function onKeyUp(event: Event): void {
				const inputValue = getTargetElement<HTMLInputElement>(event).value;

				EventsManager.dispatchEvent(EventsManager.events.REFRESH_CONTACTS_LIST, inputValue);
			},
		],
	});

	return Ryakt.createElement("div", { className: "SearchInput" }, [children]);
}

export default SearchInput;
