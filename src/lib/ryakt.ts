import { U_Unshift } from "../types";
import { isObject, isString } from "./validator";

type T_EventHandler = [selector: string, handler: (ev: Event) => void];
type T_EventHandlerWithEventName = U_Unshift<"click", T_EventHandler>;

type T_CreateElementPropsParam = {
	[key: string]: unknown;
	className?: string;
	onClick?: T_EventHandler;
} | null;

const Ryakt = {
	listeners: [] as T_EventHandlerWithEventName[],
	addEventListener(listener: T_EventHandlerWithEventName) {
		this.listeners.push(listener);
	},
	attachEventListeners() {
		this.listeners.forEach(([eventName, selector, handler]: T_EventHandlerWithEventName) => {
			document.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, (event: Event) => {
					handler(event);
				});
			});
		});

		this.listeners = [];
	},

	createElement(
		element: string,
		props: T_CreateElementPropsParam,
		children?: (T_RyaktElement | string)[],
	): T_RyaktElement {
		const Element = document.createElement(element);

		if (props) {
			Object.entries(props).forEach(([key, value]) => {
				if (key === "className") {
					Element.classList.add(String(value));
				} else if (key === "onClick") {
					this.addEventListener(["click", ...(value as T_EventHandler)]);
				} else {
					Element.setAttribute(key, String(value));
				}
			});
		}

		if (Array.isArray(children)) {
			children.forEach((child) => {
				if (isRyaktElement(child)) {
					Element.appendChild(child.render());
				} else if (isString(child)) {
					Element.innerHTML += child;
				}
			});
		}

		return {
			isRyaktElement: true, // TODO: Try to use symbols to identify this kind of objects (3)
			element: Element,
			render: function render() {
				return Element;
			},
			toString: () => {
				return Element.outerHTML;
			},
		};
	},
};

const RyaktDOM = {
	render: function render(element: T_RyaktElement, target: HTMLElement | null) {
		if (!target) throw new Error("Invalid target");

		target.appendChild(element.element);
		Ryakt.attachEventListeners();
	},
};

export default Ryakt;
export { RyaktDOM };

// --- Types ---

// TODO: Remove any (2)
export type T_RyaktComponent = (props?: any) => T_RyaktElement;

export type T_RyaktElement = {
	isRyaktElement: true;
	element: HTMLElement;
	render: () => HTMLElement;
	toString: () => string;
};

// --- Utils ---

function isRyaktElement(input: unknown): input is T_RyaktElement {
	return isObject(input) && "isRyaktElement" in input && input["isRyaktElement"] === true;
}
