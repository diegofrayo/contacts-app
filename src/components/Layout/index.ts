import SearchInput from "~/components/SearchInput";
import ContactsList from "~/components/ContactsList";
import Separator from "~/components/Separator";
import Ryakt from "~/lib/ryakt";

function Layout() {
	const children = `
		<h2 class="fw-text-center fw-mb-10">CONTACTS</h2>
		${SearchInput()}
		${Separator({ size: 2 })}
		${ContactsList()}
  `;

	return Ryakt.createElement("div", { className: "Layout" }, [children]);
}

export default Layout;
