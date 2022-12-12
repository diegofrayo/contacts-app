import IEventsManager from "./Interface";

const EVENTS = ["REFRESH_CONTACTS_LIST"] as const;
type T_EventId = typeof EVENTS[number];

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

	dispatchEvent(eventId: T_EventId, payload: unknown) {
		this.strategy.dispatchEvent(eventId, payload);
	}

	addEventListener<G_Payload>(eventId: T_EventId, handler: (payload: G_Payload) => void) {
		this.strategy.addEventListener(eventId, handler);
	}
}

export default EventsManagerContext;
