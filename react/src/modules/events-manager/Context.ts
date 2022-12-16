import IEventsManager from "./Interface";

class EventsManagerContext {
	public events;
	private strategy;

	constructor(strategy: IEventsManager) {
		this.strategy = strategy;
		this.events = EVENTS.reduce((result, element) => {
			return { ...result, [element]: element };
		}, {} as Record<T_EventId, T_EventId>);
	}

	setStrategy(strategy: IEventsManager) {
		this.strategy = strategy;
	}

	dispatchEvent(eventId: T_EventId, payload?: unknown) {
		console.log("You are using:", `EventsManager${this.strategy.name}`);
		this.strategy.dispatchEvent(eventId, payload);
	}

	addEventListener<G_Payload>(eventId: T_EventId, handler: (payload: G_Payload) => void) {
		console.log("You are using:", `EventsManager${this.strategy.name}`);
		this.strategy.addEventListener(eventId, handler);
	}
}

export default EventsManagerContext;

// --- Constants ---

const EVENTS = ["REFRESH_CONTACTS_LIST", "SHOW_CREATE_CONTACT_MODAL"] as const;

// --- Types ---

type T_EventId = typeof EVENTS[number];
