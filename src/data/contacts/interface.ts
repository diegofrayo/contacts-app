import type { T_Object } from "~/types";
import type { T_Contact } from "./model";

abstract class ContactDAO {
	abstract loadDefaultData(): void;
	abstract create(input: T_Object): Promise<T_Contact>;
	abstract getAll(): Promise<T_Contact[]>;
	abstract deleteById(id: T_Contact["id"]): Promise<T_Contact>;
}

export default ContactDAO;
