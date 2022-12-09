import ContactsContext from "./context";
import ContactsLocalStorageStrategy from "./strategy-local-storage";

export default new ContactsContext(new ContactsLocalStorageStrategy());
