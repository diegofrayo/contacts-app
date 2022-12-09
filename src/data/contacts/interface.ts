import type { T_Object } from "~/types";
import type { T_Contact } from "./model";

interface IContactsStrategy {
	loadDefaultData(): void;
	create(rawContact: T_Object): Promise<T_Contact>;
	getAll(): Promise<T_Contact[]>;
	deleteById(id: T_Contact["id"]): Promise<T_Contact>;
}

export default IContactsStrategy;
