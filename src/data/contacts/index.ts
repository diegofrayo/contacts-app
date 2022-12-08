import IContact from "./interface";
import ContactsDAOLocalStorageImplementation from "./implementation-local-storage";

class ContactsDAO {
	instance: IContact;

	constructor() {
		this.instance = new ContactsDAOLocalStorageImplementation();
	}
}

export default new ContactsDAO().instance;
