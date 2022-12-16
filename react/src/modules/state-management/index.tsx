import * as React from "react";

import type { T_ReactChildren } from "~/types";

import contactsSlice from "./contacts";

// --- Actions ---

export * from "./contacts";

// --- Store ---

const INITIAL_STORE = {
	contacts: contactsSlice.initialState,
};

type T_Store = typeof INITIAL_STORE;

export const store = INITIAL_STORE;

// --- API ---

const reducers = {
	contacts: contactsSlice.reducer,
};

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
		setCurrentStore(updatedStore);
	}

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

	return function innerDispatch(action: { type: string; payload: any }) {
		Object.entries(reducers).forEach(([reducerKey, reducerFunction]) => {
			updateStore({
				...store,
				[reducerKey]: reducerFunction(store[reducerKey as keyof typeof INITIAL_STORE], action),
			});
		});
	};
}

export function useSelector<G_SelectorReturn>(selector: (store: T_Store) => G_SelectorReturn) {
	const { store } = useContactsContext();

	return selector(store);
}

// --- Selectors ---

export function getContactsSelector(store: T_Store) {
	return store.contacts.items;
}
