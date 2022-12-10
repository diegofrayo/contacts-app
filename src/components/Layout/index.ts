import ContactsList from "~/components/ContactsList";
import CreateContactModal from "~/components/CreateContactModal";
import SearchInput from "~/components/SearchInput";
import Separator from "~/components/Separator";
import Contacts from "~/data/contacts";
import Ryakt from "~/lib/ryakt";

function Layout() {
	function handleCreateContactClick(e: Event): void {
		e.preventDefault();

		// TODO: [Diego] Use EventManager to accomplish this
		document.querySelector(".CreateContactModal")?.classList.toggle("show");
	}

	const children = `
		<header class="header fw-mb-6">
			<h2 class="fw-text-center">Contacts</h2>
			<div class="header__create-contact">
			${Ryakt.createElement(
				"button",
				{
					className: "header__create-contact__button",
					onClick: [".header__create-contact__button", handleCreateContactClick],
				},
				["+"],
			)}
			</div>
 		</header>

		${SearchInput()}
		${Separator({ size: 2 })}
		${ContactsList()}
		${CreateContactModal()}
  `;

	return Ryakt.createElement("div", { className: "Layout" }, [children], {
		didMount: function LayoutDidMount() {
			Contacts.loadDefaultData();
		},
	});
}

export default Layout;
