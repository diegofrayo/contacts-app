import SearchInput from "../SearchInput";
import ContactsList from "../ContactsList";
import CONTACTS from "../../data/contacts";
import Ryakt from "../../lib/ryakt";

function Wrapper() {
	const children = `
		<h2>All Contacts</h2>
		${SearchInput()}
		${ContactsList({ contacts: CONTACTS })}
  `;

	return Ryakt.createElement("div", { className: "wrapper" }, [children]);
}

export default Wrapper;
