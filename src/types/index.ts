// --- Models ---
export type T_Contact = {
	name: string;
	img: string;
	tel: string;
};

// --- Rendering ---

// TODO
export type T_Component = (props?: any) => T_ComponentReturn;

export type T_ComponentReturn = string | Element;

export type T_ComponentOutput = {
	isRenderedComponent: true;
	element: T_ComponentReturn;
	toString: () => string;
};

// --- Primitives ---

export type T_Object<G_Values> = { [key: string | number | symbol]: G_Values };
