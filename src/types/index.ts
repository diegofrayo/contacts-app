// --- Primitives ---

export type T_Object<G_Values = unknown> = { [key: string | number | symbol]: G_Values };

// --- Utilities ---

export type U_Unshift<G_NewItem, G_Tuple extends readonly unknown[]> = ((
	newItem: G_NewItem,
	...tuple: G_Tuple
) => void) extends (...items: infer Item) => void
	? Item
	: never;
