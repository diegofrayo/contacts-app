import * as React from "react";

import type { T_ReactChildren } from "~/types";

import contactsSlice from "./contacts";
import configSlice from "./config";

// --- Actions ---

export * from "./contacts";
export * from "./config";

// --- Store ---

const INITIAL_STORE = {
	contacts: contactsSlice.initialState,
	config: configSlice.initialState,
};

type T_Store = typeof INITIAL_STORE;

export const store = INITIAL_STORE;

// --- API ---

const reducers = {
	contacts: contactsSlice.reducer,
	config: configSlice.reducer,
} as const;

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

type T_Reducer<G_Object = typeof reducers> = G_Object extends {
	[Key in keyof G_Object as Key]: infer U;
}
	? U
	: never;

export function useDispatch() {
	const { store, updateStore } = useContactsContext();

	return function innerDispatch(action: { type: string; payload: any }) {
		const updatedStore = Object.entries(reducers).reduce((currentStore, [key, reducerFunction]) => {
			const reducerKey = key as keyof typeof INITIAL_STORE;

			return {
				...currentStore,
				[reducerKey]: reducerFunction(currentStore[reducerKey] as any, action),
				// TODO: Try to remove this any
			};
		}, store);

		updateStore(updatedStore);
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

export function getSearchInputValueSelector(store: T_Store) {
	return store.config.searchInputValue;
}
