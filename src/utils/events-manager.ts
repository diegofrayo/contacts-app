export default {
	ON_INPUT_SEARCH_CHANGE: "ON_INPUT_SEARCH_CHANGE" as T_EventId,

	dispatchEvent<G_Payload>(eventId: T_EventId, payload: G_Payload) {
		const action = new CustomEvent(eventId, {
			detail: payload,
		});

		document.dispatchEvent(action);
	},

	addEventListener(eventId: T_EventId, handler: (event: CustomEvent) => void) {
		document.addEventListener(
			eventId,
			(event: Event) => {
				handler(event as CustomEvent);
			},
			false,
		);
	},
};

// --- Types ---

type T_EventId = "ON_INPUT_SEARCH_CHANGE";
