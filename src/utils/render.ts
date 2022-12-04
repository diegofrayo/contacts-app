import { T_Component, T_Object, T_ComponentOutput } from "../types";

type T_CreateElementParams = {
	element: string; // TODO
	children?: HTMLElement[];
	className?: string;
	props?: T_Object<string | number | boolean>;
};

export function createElement({ element, className, props, children }: T_CreateElementParams) {
	const Element = document.createElement(element);

	if (className) {
		Element.classList.add(className);
	}

	if (props) {
		Object.entries(props).forEach(([key, value]) => {
			Element.setAttribute(key, String(value));
		});
	}

	if (children) {
		if (typeof children === "string") {
			Element.innerText = children;
		} else {
			Element.append(...children);
		}
	}

	return Element;
}

export function createComponent(Component: T_Component) {
	return function innerCreateComponent(props?: T_Object<unknown>): T_ComponentOutput {
		const RenderedComponent = Component(props);

		return {
			isRenderedComponent: true, // TODO
			element: RenderedComponent,
			toString: () => {
				return typeof RenderedComponent === "string"
					? RenderedComponent
					: RenderedComponent.outerHTML;
			},
		};
	};
}

export function renderComponent(
	component: string | HTMLElement | T_ComponentOutput,
	target: HTMLElement | null,
) {
	if (!target) throw new Error("Invalid target");

	if (typeof component === "string" || isRenderedComponent(component)) {
		target.innerHTML = `${component}`;
	} else if (component instanceof HTMLElement) {
		target.appendChild(component);
	} else {
		throw new Error("Invalid component");
	}
}

// --- Utils ---

function isRenderedComponent(input: unknown): input is T_ComponentOutput {
	return (
		(input || false) &&
		typeof input === "object" &&
		"element" in input &&
		"toString" in input &&
		"isRenderedComponent" in input &&
		input["isRenderedComponent"] === true
	);
}
