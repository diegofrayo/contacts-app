import ContactsList from "~/components-react/ContactsList";
import CreateContactModal from "~/components-react/CreateContactModal";
import SearchInput from "~/components-react/SearchInput";
import Separator from "~/components-react/Separator";
import { useDidMount } from "~/hooks";
import Contacts from "~/modules/data/contacts";
import EventsManager from "~/modules/events-manager";
import { setContactsAction, useDispatch } from "~/modules/state-management";
import type { T_ReactOnChangeEventObject } from "~/types";

function Layout() {
	// hooks
	const dispatch = useDispatch();

	// effects
	useDidMount(() => {
		fetchContacts();
	});

	// handlers
	function handleCreateContactClick(): void {
		EventsManager.instance.dispatchEvent(EventsManager.instance.events.SHOW_CREATE_CONTACT_MODAL);
	}

	function onEventsManagerSelectChange(event: T_ReactOnChangeEventObject<HTMLSelectElement>): void {
		const selectedOption = event.currentTarget.value;

		EventsManager.changeContextStrategy(selectedOption);
	}

	// utils
	async function fetchContacts(): Promise<void> {
		const contacts = await Contacts.loadDefaultData();

		dispatch(setContactsAction(contacts));
	}

	return (
		<div className="Layout cpp-gradient">
			<header className="header tw-mb-6">
				<h2 className="tw-leading-none">Contacts</h2>
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
			<Separator
				size={8}
				className="cpp-gradient--inverse"
			/>
			<details>
				<summary>
					<h2 className="tw-leading-none tw-mb-6 tw-cursor-pointer">Config</h2>
				</summary>
				<p className="tw-mb-1">Events manager:</p>
				<select
					value={EventsManager.getSelectedStrategy()}
					onChange={onEventsManagerSelectChange}
				>
					<option value="window">window</option>
					<option value="publish/subscribe">publish/subscribe</option>
				</select>
			</details>
			<CreateContactModal />
		</div>
	);
}

export default Layout;
