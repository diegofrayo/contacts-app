import ContactsContext from "./Context";
import StrategyWithLocalStorage from "./StrategyWithLocalStorage";
// import StrategyWithFirebase from "./StrategyWithFirebase";

export default new ContactsContext(new StrategyWithLocalStorage());
