import { v4 as uuidv4 } from "uuid";

import v from "~/lib/validator";
import type { T_Object } from "~/types";

import IContactsStrategy from "./Interface";
import Contact, { T_Contact, T_CreateContactDTO } from "./Model";

class StrategyWithLocalStorage implements IContactsStrategy {
	private LOCAL_STORAGE_KEY = "capp_contacts";

	async loadDefaultData() {
		this.write([
			{
				id: "2b9450c1-c2f8-423d-bad8-798a34e9145e",
				name: "Leos Adate",
				tel: "+1 505-644-0802",
				instagram: "kaarot",
				whatsApp: "",
				mail: "potus@gmail.com",
			},
			{
				id: "0e72573a-3c63-4b01-8c7c-22da49100425",
				name: "Ocia Gigri",
				tel: "+1 813-688-9510",
				instagram: "",
				whatsApp: "+1 813-688-9510",
				mail: "gigri@gmail.com",
			},
			{
				id: "3a08ff0e-c1ae-47c1-b51f-1b8950eecfe0",
				name: "Cicella Anders",
				tel: "+1 203-448-7916",
			},
			{
				id: "6189f7b7-fdd9-42cc-9d0f-9b4e00e710d7",
				name: "Liona Balon",
				tel: "+1 412-632-3247",
			},
		]);
	}

	async create(contact: T_CreateContactDTO) {
		const contacts = await this.getAll();
		const newContact = new Contact({ ...contact, id: uuidv4() });

		contacts.push(newContact);
		this.write(contacts);

		return newContact;
	}

	getAll(): Promise<T_Contact[]> {
		return Promise.resolve(this.read());
	}

	async deleteById(id: T_Contact["id"]): Promise<T_Contact> {
		const contacts = await this.getAll();
		const contactToDeleteIndex = contacts.findIndex((contact) => contact.id === id);

		if (contactToDeleteIndex === -1) {
			throw new Error(`Contact not found with id "${id}"`);
		}

		const deletedContact = contacts[contactToDeleteIndex];
		contacts.splice(contactToDeleteIndex, 1);
		this.write(contacts);

		return deletedContact;
	}

	private read(): T_Contact[] {
		const rawData = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);

		if (v.isNotEmptyString(rawData)) {
			const parsedData = JSON.parse(rawData) as T_Object[];

			return parsedData.map((rawContact) => {
				return new Contact(rawContact);
			});
		}

		return [];
	}

	private write(contacts: T_Contact[]): void {
		window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(contacts));
	}
}

export default StrategyWithLocalStorage;
