import ContactsList from "~/components/ContactsList";
import CreateContactModal from "~/components/CreateContactModal";
import SearchInput from "~/components/SearchInput";
import Separator from "~/components/Separator";
import Ryakt from "~/lib/ryakt";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";

function Layout() {
	// handlers
	function handleCreateContactClick(): void {
		EventsManager.instance.dispatchEvent(EventsManager.instance.events.SHOW_CREATE_CONTACT_MODAL);
	}

	const children = `
		<header class="header tw-mb-6">
			<h2 class="tw-text-center">Contacts</h2>
			<div class="header__create-contact">
				<button class="header__create-contact__button">+</button>
			</div>
 		</header>
		${SearchInput()}
		${Separator({ size: 2 })}
		${ContactsList()}
		${CreateContactModal()}
  `;

	return Ryakt.createElement("div", { className: "Layout cpp-gradient" }, [children], {
		didMount: function LayoutDidMount() {
			return Contacts.loadDefaultData();
		},
		DOMEventsListeners: [["click", ".header__create-contact__button", handleCreateContactClick]],
	});
}

export default Layout;
