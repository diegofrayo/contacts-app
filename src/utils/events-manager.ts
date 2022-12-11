export default {
	REFRESH_CONTACTS_LIST: "REFRESH_CONTACTS_LIST" as T_EventId,

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

type T_EventId = "REFRESH_CONTACTS_LIST";
