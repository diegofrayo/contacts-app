import IEventsManager from "./Interface";

class StrategyWithPattern implements IEventsManager {
	dispatchEvent(eventId: string, payload: unknown) {
		PublisherSubscriber.publish(eventId, payload);
	}

	addEventListener<G_Payload>(eventId: string, handler: (payload: G_Payload) => void) {
		PublisherSubscriber.subscribe(eventId, handler);
	}
}

export default StrategyWithPattern;

// --- Utils ---

const PublisherSubscriber = {
	id: 0,
	events: {} as Record<string, { id: number; callback: (payload: any) => void }[]>,

	publish(eventId: string, payload: unknown) {
		for (let subscriber of this.events[eventId]) {
			subscriber.callback(payload);
		}
	},

	subscribe<G_Payload>(eventId: string, callback: (payload: G_Payload) => void) {
		if (!(eventId in this.events)) {
			this.events[eventId] = [];
		}

		this.events[eventId].push({
			id: ++this.id,
			callback,
		});

		return this.id;
	},

	unsubscribe(eventId: string, callbackId: number) {
		this.events[eventId] = this.events[eventId].filter((event) => {
			return event.id !== callbackId;
		});
	},
};
