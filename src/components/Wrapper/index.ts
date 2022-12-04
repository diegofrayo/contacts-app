import SearchInput from "../SearchInput";
import ContactsList from "../ContactsList";
import CONTACTS from "../../data/contacts";
import { createComponent } from "../../utils/render";

function Wrapper() {
	const html = `
		<div class="wrapper">
			<h2 class="contact-title">All Contacts</h2>
			${SearchInput()}
			${ContactsList({ contacts: CONTACTS })}
		</div>
  `;

	return html;
}

export default createComponent(Wrapper);
