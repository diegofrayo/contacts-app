import IEventsManager from "./Interface";

class StrategyWithBrowserAPI implements IEventsManager {
	dispatchEvent(eventId: string, payload: unknown) {
		const action = new CustomEvent(eventId, { detail: payload });
		window.dispatchEvent(action);
	}

	addEventListener<G_Payload>(eventId: string, handler: (payload: G_Payload) => void) {
		window.addEventListener(eventId, (event: Event) => {
			handler((event as CustomEvent<G_Payload>).detail);
		});
	}
}

export default StrategyWithBrowserAPI;
