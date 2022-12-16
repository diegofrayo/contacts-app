import ContactsContext from "./Context";
import StrategyWithLocalStorage from "./StrategyWithLocalStorage";
// import StrategyWithFirebase from "./StrategyWithFirebase";

export default new ContactsContext(new StrategyWithLocalStorage());

export type { T_Contact, T_ContactObject, T_CreateContactDTO } from "./Model";
