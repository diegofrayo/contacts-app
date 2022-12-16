import * as React from "react";

import type { T_Contact } from "~/modules/data/contacts";
import type { T_ReactChildren } from "~/types";

// --- Store ---

const INITIAL_STORE = {
	items: [] as T_Contact[],
};

export const store = INITIAL_STORE;

// --- Actions ---

const ACTION_TYPES = {
	CREATE_CONTACT: "CREATE_CONTACT",
	DELETE_CONTACT: "DELETE_CONTACT",
	SET_CONTACTS: "SET_CONTACTS",
} as const;
type T_ActionTypes = (keyof typeof ACTION_TYPES)[number];
type T_Action<G_Payload = any> = { type: T_ActionTypes; payload: G_Payload };

// --- Slice ---

const contactsSlice = {
	name: "contacts",
	initialState: INITIAL_STORE,
	reducer: (state = INITIAL_STORE, action: T_Action) => {
		switch (action.type) {
			case ACTION_TYPES.CREATE_CONTACT:
				return {
					...state,
					items: state.items.concat([action.payload]),
				};

			case ACTION_TYPES.DELETE_CONTACT:
				return {
					...state,
					items: state.items.filter((contact) => {
						return contact.id !== action.payload;
					}),
				};

			case ACTION_TYPES.SET_CONTACTS:
				return {
					...state,
					items: action.payload,
				};

			default:
				return state;
		}
	},
	actions: {
		createContactAction(newContact: T_Contact) {
			return {
				type: ACTION_TYPES.CREATE_CONTACT,
				payload: newContact,
			};
		},
		deleteContactAction(contactId: T_Contact["id"]) {
			return {
				type: ACTION_TYPES.DELETE_CONTACT,
				payload: contactId,
			};
		},
		setContactsAction(contacts: T_Contact[]) {
			return {
				type: ACTION_TYPES.SET_CONTACTS,
				payload: contacts,
			};
		},
	},
};

export const { createContactAction, deleteContactAction, setContactsAction } =
	contactsSlice.actions;

export default contactsSlice;
