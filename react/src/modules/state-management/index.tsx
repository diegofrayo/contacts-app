import * as React from "react";

import type { T_Contact } from "~/modules/data/contacts";
import type { T_ReactChildren } from "~/types";

// --- Store ---

const INITIAL_STORE = {
	contacts: [] as T_Contact[],
};

type T_Store = typeof INITIAL_STORE;

export const store = INITIAL_STORE;

// --- API ---

type T_Context = {
	store: T_Store;
	updateStore: (newStore: T_Store) => void;
};

const StoreContext = React.createContext<T_Context>({} as T_Context);

function useContactsContext() {
	return React.useContext(StoreContext);
}

export function Provider({
	children,
	store: initialStore,
}: {
	children: T_ReactChildren;
	store: T_Store;
}) {
	const [currentStore, setCurrentStore] = React.useState<T_Store>(initialStore);

	function updateStore(updatedStore: T_Store) {
		console.log("updatedStore", updatedStore);
		setCurrentStore(updatedStore);
	}

	console.log("currentStore", currentStore);

	return (
		<StoreContext.Provider
			value={{
				store: currentStore,
				updateStore,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useDispatch() {
	const { store, updateStore } = useContactsContext();

	return function innerDispatch(action: T_Action) {
		updateStore(contactsReducer(store, action));
	};
}

export function useSelector(selector: (store: T_Store) => T_StoreItemValue<T_Store>) {
	const { store } = useContactsContext();

	return selector(store);
}

type T_StoreItemValue<G_Object> = G_Object extends { [Key in keyof G_Object as Key]: infer U }
	? U
	: never;

// --- Actions ---

const ACTION_TYPES = {
	CREATE_CONTACT: "CREATE_CONTACT",
	DELETE_CONTACT: "DELETE_CONTACT",
	SET_CONTACTS: "SET_CONTACTS",
} as const;
type T_ActionTypes = (keyof typeof ACTION_TYPES)[number];
type T_Action<G_Payload = any> = { type: T_ActionTypes; payload: G_Payload };

export const createContactAction = (newContact: T_Contact) => {
	return {
		type: ACTION_TYPES.CREATE_CONTACT,
		payload: newContact,
	};
};

export const deleteContactAction = (contactId: T_Contact["id"]) => {
	return {
		type: ACTION_TYPES.DELETE_CONTACT,
		payload: contactId,
	};
};

export const setContactsAction = (contacts: T_Contact[]) => {
	return {
		type: ACTION_TYPES.SET_CONTACTS,
		payload: contacts,
	};
};

// --- Reducers ---

export const contactsReducer = (state = INITIAL_STORE, action: T_Action) => {
	switch (action.type) {
		case ACTION_TYPES.CREATE_CONTACT:
			return { ...state, contacts: state.contacts.concat([action.payload]) };

		case ACTION_TYPES.DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact.id !== action.payload;
				}),
			};

		case ACTION_TYPES.SET_CONTACTS:
			console.log({ ...state, contacts: action.payload });

			return { ...state, contacts: action.payload };

		default:
			return state;
	}
};

// --- Selectors ---

export function getContactsSelector(store: T_Store) {
	return store.contacts;
}
