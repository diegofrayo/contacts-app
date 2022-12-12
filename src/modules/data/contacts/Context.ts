import v from "~/lib/validator";

import IContacts from "./Interface";
import type { T_Contact, T_CreateContactDTO } from "./Model";

class ContactsContext {
	private strategy: IContacts;

	constructor(strategy: IContacts) {
		this.strategy = strategy;
	}

	setStrategy(strategy: IContacts) {
		this.strategy = strategy;
	}

	async loadDefaultData() {
		const contacts = await this.getAll();

		if (v.isEmptyArray(contacts)) {
			this.strategy.loadDefaultData();
		}
	}

	async create(newContact: T_CreateContactDTO) {
		return this.strategy.create(newContact);
	}

	async getAll(): Promise<T_Contact[]> {
		// Custom logic, common for any strategy...
		console.time("ContactsContext.getAll");
		const response = await this.strategy.getAll();
		console.timeEnd("ContactsContext.getAll");

		return response;
	}

	async deleteById(id: T_Contact["id"]): Promise<T_Contact> {
		return this.strategy.deleteById(id);
	}
}

export default ContactsContext;
