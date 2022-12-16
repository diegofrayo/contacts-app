// --- Store ---

const INITIAL_STORE = {
	searchInputValue: "",
};

export const store = INITIAL_STORE;

// --- Actions ---

const ACTION_TYPES = {
	UPDATE_SEARCH_INPUT_VALUE: "UPDATE_SEARCH_INPUT_VALUE",
} as const;
type T_ActionTypes = (keyof typeof ACTION_TYPES)[number];
type T_Action<G_Payload = any> = { type: T_ActionTypes; payload: G_Payload };

// --- Slice ---

const configsSlice = {
	name: "config",
	initialState: INITIAL_STORE,
	reducer: (state: typeof INITIAL_STORE, action: T_Action) => {
		switch (action.type) {
			case ACTION_TYPES.UPDATE_SEARCH_INPUT_VALUE:
				return {
					...state,
					searchInputValue: action.payload,
				};

			default:
				return state;
		}
	},
	actions: {
		updateSearchInputValueAction(payload: string) {
			return {
				type: ACTION_TYPES.UPDATE_SEARCH_INPUT_VALUE,
				payload,
			};
		},
	},
};

export const { updateSearchInputValueAction } = configsSlice.actions;

export default configsSlice;
