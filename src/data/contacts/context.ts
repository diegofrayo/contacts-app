import { T_Object } from "~/types";

import IContactsStrategy from "./interface";
import type { T_Contact } from "./model";

class ContactsContext {
	private strategy: IContactsStrategy;

	constructor(strategy: IContactsStrategy) {
		this.strategy = strategy;
	}

	setStrategy(strategy: IContactsStrategy) {
		this.strategy = strategy;
	}

	async loadDefaultData() {
		return this.strategy.loadDefaultData();
	}

	async create(rawContact: T_Object) {
		return this.strategy.create(rawContact);
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
