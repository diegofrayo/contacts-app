import ContactsList from "~/components-react/ContactsList";
import CreateContactModal from "~/components-react/CreateContactModal";
import SearchInput from "~/components-react/SearchInput";
import Separator from "~/components-react/Separator";
import { useDidMount } from "~/hooks";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";
import { setContactsAction, useDispatch } from "~/modules/state-management";
import type { T_ReactOnClickEventObject } from "~/types";

function Layout() {
	// hooks
	const dispatch = useDispatch();

	// effects
	useDidMount(() => {
		fetchContacts();
	});

	// handlers
	function handleCreateContactClick(): void {
		EventsManager.dispatchEvent(EventsManager.events.SHOW_CREATE_CONTACT_MODAL);
	}

	// utils
	async function fetchContacts(): Promise<void> {
		const contacts = await Contacts.loadDefaultData();

		dispatch(setContactsAction(contacts));
	}

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
