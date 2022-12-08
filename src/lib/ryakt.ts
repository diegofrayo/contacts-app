import type { U_Unshift } from "~/types";

import v from "./validator";

type T_DOMEventHandler = [selector: string, handler: (ev: Event) => void];
type T_DOMEventHandlerWithEventName = U_Unshift<"click" | "change" | "keyup", T_DOMEventHandler>;
type T_CreateElementPropsParam = {
	[key: string]: unknown;
	className?: string;
	onClick?: T_DOMEventHandler;
	onChange?: T_DOMEventHandler;
	onKeyUp?: T_DOMEventHandler;
} | null;
type T_DidMountMethod = () => void;

const Ryakt = {
	DOMEventsListeners: [] as T_DOMEventHandlerWithEventName[],
	addDOMEventListener(listener: T_DOMEventHandlerWithEventName) {
		this.DOMEventsListeners.push(listener);
	},
	attachDOMEventsListeners() {
		this.DOMEventsListeners.forEach(
			([eventName, selector, handler]: T_DOMEventHandlerWithEventName) => {
				document.querySelectorAll(selector).forEach((element) => {
					element.addEventListener(eventName, handler);
				});
			},
		);

		this.DOMEventsListeners = [];
	},

	didMountMethods: [] as T_DidMountMethod[],
	addDidMountMethod(method: T_DidMountMethod) {
		this.didMountMethods.push(method);
	},
	executeDidMountMethods() {
		this.didMountMethods.reverse().forEach((method) => {
			method();
		});

		this.didMountMethods = [];
	},

	createElement(
		element: string,
		props: T_CreateElementPropsParam,
		children?: (T_RyaktElement | string)[],
		options?: { didMount: T_DidMountMethod },
	): T_RyaktElement {
		const Element = document.createElement(element);

		if (props) {
			Object.entries(props).forEach(([key, value]) => {
				if (key === "className") {
					Element.classList.add(...String(value).split(" "));
					// TODO: Create regex for event handlers (2)
				} else if (key === "onClick") {
					this.addDOMEventListener(["click", ...(value as T_DOMEventHandler)]);
				} else if (key === "onChange") {
					this.addDOMEventListener(["change", ...(value as T_DOMEventHandler)]);
				} else if (key === "onKeyUp") {
					this.addDOMEventListener(["keyup", ...(value as T_DOMEventHandler)]);
				} else {
					Element.setAttribute(key, String(value));
				}
			});
		}

		if (Array.isArray(children)) {
			children.forEach((child) => {
				if (isRyaktElement(child)) {
					Element.appendChild(child.render());
				} else if (v.isString(child)) {
					Element.innerHTML += child;
				}
			});
		}

		if (options?.didMount) {
			this.addDidMountMethod(options.didMount);
		}

		return {
			// TODO: Try to use symbols to identify this kind of objects (3)
			isRyaktElement: true,
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
		Ryakt.attachDOMEventsListeners();
		Ryakt.executeDidMountMethods();
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
	return v.isObject(input) && "isRyaktElement" in input && input["isRyaktElement"] === true;
}
