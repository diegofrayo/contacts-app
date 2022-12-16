import type { T_Contact, T_CreateContactDTO } from "./Model";

interface IContacts {
	loadDefaultData(): Promise<T_Contact[]>;
	create(newContact: T_CreateContactDTO): Promise<T_Contact>;
	getAll(): Promise<T_Contact[]>;
	deleteById(id: T_Contact["id"]): Promise<T_Contact>;
}

export default IContacts;
