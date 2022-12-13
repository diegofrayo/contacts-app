interface IEventsManager {
	dispatchEvent<G_Payload>(eventId: string, payload: G_Payload): void;
	addEventListener<G_Payload>(eventId: string, handler: (payload: G_Payload) => void): void;
}

export default IEventsManager;
