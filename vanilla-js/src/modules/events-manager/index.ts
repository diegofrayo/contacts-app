import EventsManagerContext from "./Context";
import StrategyWithPattern from "./StrategyWithPattern";
import StrategyWithBrowserAPI from "./StrategyWithBrowserAPI";
import { isServer } from "~/utils";

class Bridge {
	public instance: EventsManagerContext;
	private LOCAL_STORAGE_KEY = "capp_events_manager_strategy";
	private selectedStrategy = "window";

	constructor() {
		this.instance = new EventsManagerContext(
			this.resolveStrategy(isServer() ? "" : window.localStorage.getItem(this.LOCAL_STORAGE_KEY)),
		);
	}

	getSelectedStrategy() {
		return this.selectedStrategy;
	}

	changeContextStrategy(strategyName: string) {
		window.localStorage.setItem(this.LOCAL_STORAGE_KEY, strategyName);
		window.location.reload();
	}

	resolveStrategy(strategyName?: string | null | undefined) {
		this.selectedStrategy = strategyName || "";

		if (strategyName === "publish/subscribe") {
			return new StrategyWithPattern();
		}

		return new StrategyWithBrowserAPI();
	}
}

export default new Bridge();

// --- Types ---

export type T_RefreshContactsListPayload = string;
