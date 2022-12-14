import ContactsList from "~/components/ContactsList";
import CreateContactModal from "~/components/CreateContactModal";
import SearchInput from "~/components/SearchInput";
import Separator from "~/components/Separator";
import Ryakt from "~/lib/ryakt";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";

function Layout() {
	// handlers
	function handleCreateContactClick(event: Event): void {
		event.preventDefault();
		EventsManager.dispatchEvent(EventsManager.events.SHOW_CREATE_CONTACT_MODAL);
	}

	const children = `
		<header class="header fw-mb-6">
			<h2 class="fw-text-center">Contacts</h2>
			<div class="header__create-contact">
				<button class="header__create-contact__button">+</button>
			</div>
 		</header>
		${SearchInput()}
		${Separator({ size: 2 })}
		${ContactsList()}
		${CreateContactModal()}
  `;

	return Ryakt.createElement("div", { className: "Layout" }, [children], {
		didMount: function LayoutDidMount() {
			return Contacts.loadDefaultData();
		},
		DOMEventsListeners: [["click", ".header__create-contact__button", handleCreateContactClick]],
	});
}

export default Layout;
