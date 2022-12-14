import ContactsList from "~/components-react/ContactsList";
import CreateContactModal from "~/components-react/CreateContactModal";
import SearchInput from "~/components-react/SearchInput";
import Separator from "~/components-react/Separator";
import { useDidMount } from "~/hooks";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";
import { T_ReactOnClickEventObject } from "~/types";

function Layout() {
	// handlers
	function handleCreateContactClick(event: T_ReactOnClickEventObject<HTMLButtonElement>): void {
		event.preventDefault();
		EventsManager.dispatchEvent(EventsManager.events.SHOW_CREATE_CONTACT_MODAL);
	}

	// effects
	useDidMount(() => {
		Contacts.loadDefaultData();
	});

	return (
		<div className="Layout">
			<header className="header fw-mb-6">
				<h2 className="fw-text-center">Contacts</h2>
				<div className="header__create-contact">
					<button
						className="header__create-contact__button"
						onClick={handleCreateContactClick}
					>
						+
					</button>
				</div>
			</header>
			<SearchInput />
			<Separator size={2} />
			<ContactsList />
			<CreateContactModal />
		</div>
	);
}

export default Layout;
