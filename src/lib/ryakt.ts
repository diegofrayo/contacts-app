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

class Ryakt {
	private DOMEventsListeners: T_DOMEventHandlerWithEventName[];
	private didMountMethods: T_DidMountMethod[];
	private static instance: Ryakt;
	private isAppRendered: boolean;

	constructor() {
		this.DOMEventsListeners = [];
		this.didMountMethods = [];
		this.isAppRendered = false;
	}

	static getInstance = () => {
		if (v.isUndefined(Ryakt.instance)) {
			Ryakt.instance = new Ryakt();
		}

		return Ryakt.instance;
	};

	createElement = (
		element: string,
		props: T_CreateElementPropsParam,
		children?: (T_RyaktElement | string)[],
		options?: { didMount: T_DidMountMethod; isRootElement?: true },
	): T_RyaktElement => {
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
	};

	renderDOM(element: T_RyaktElement, target: HTMLElement | null) {
		if (v.isNull(target)) {
			throw new Error("Invalid target");
		}

		if (this.isAppRendered === true) {
			throw new Error("App already rendered, you can't render the app multiple times");
		}

		target.appendChild(element.element);
		this.attachDOMEventsListeners();
		this.executeDidMountMethods();
		this.isAppRendered = true;
	}

	private attachDOMEventsListeners = () => {
		this.DOMEventsListeners.forEach(
			([eventName, selector, handler]: T_DOMEventHandlerWithEventName) => {
				document.querySelectorAll(selector).forEach((element) => {
					element.addEventListener(eventName, handler);
				});
			},
		);

		this.DOMEventsListeners = [];
	};

	private executeDidMountMethods = () => {
		this.didMountMethods.reverse().forEach((method) => {
			method();
		});

		this.didMountMethods = [];
	};

	private addDidMountMethod(method: T_DidMountMethod) {
		this.didMountMethods.push(method);
	}

	private addDOMEventListener(listener: T_DOMEventHandlerWithEventName) {
		this.DOMEventsListeners.push(listener);
	}
}

export default Ryakt.getInstance();

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