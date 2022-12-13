import EventsManagerContext from "./Context";
import StrategyWithPattern from "./StrategyWithPattern";
// import StrategyWithBrowserAPI from "./StrategyWithBrowserAPI";

export default new EventsManagerContext(new StrategyWithPattern());

// --- Types ---

export type T_RefreshContactsListPayload = string;
