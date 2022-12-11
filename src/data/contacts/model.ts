import { z } from "zod";

import type { T_Object } from "~/types";

class Contact {
	public id;
	public name;
	public avatar;
	public tel;
	public instagram;
	public whatsApp;
	public mail;

	constructor(rawContact: T_Object) {
		const parsedContact = Schema.parse(rawContact);

		this.id = parsedContact.id;
		this.name = parsedContact.name;
		this.avatar = parsedContact.avatar;
		this.tel = parsedContact.tel;
		this.instagram = parsedContact.instagram;
		this.whatsApp = parsedContact.whatsApp;
		this.mail = parsedContact.mail;
	}
}

export default Contact;

// --- Types ---

const Schema = z.object({
	id: z.string(),
	name: z.string(),
	avatar: z.optional(z.string()),
	tel: z.optional(z.string()),
	instagram: z.optional(z.string()),
	whatsApp: z.optional(z.string()),
	mail: z.optional(z.string()),
});

export type T_Contact = z.infer<typeof Schema>;
