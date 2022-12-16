import { resolvePromisesSequentially } from "~/utils";
import type { U_Unshift } from "~/types";

import v from "./validator";

class Ryakt {
	private static instance: Ryakt;
	private DOMEventsListeners: T_DOMEventHandlerWithEventName[];
	private didMountMethods: T_DidMountMethod[];
	private isAppAlreadyRendered: boolean;

	constructor() {
		this.DOMEventsListeners = [];
		this.didMountMethods = [];
		this.isAppAlreadyRendered = false;
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
		options?: {
			didMount?: T_DidMountMethod;
			DOMEventsListeners?: T_DOMEventHandlerWithEventName[];
		},
	): T_RyaktElement => {
		const Element = document.createElement(element);

		if (props) {
			Object.entries(props).forEach(([key, value]) => {
				if (key === "className") {
					Element.classList.add(...String(value).split(" "));
				} else if (isEventListener(key)) {
					this.addDOMEventListener([
						key.substring(2).toLowerCase() as T_DOMEventHandlerWithEventName["0"],
						...(value as T_DOMEventHandler),
					]);
				} else if (v.isNumber(value) || v.isString(value) || v.isBoolean(value)) {
					Element.setAttribute(key, String(value));
				} else {
					console.warn("Invalid attribute value", key, typeof key);
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

		if (options?.DOMEventsListeners) {
			options.DOMEventsListeners.forEach((listener) => {
				this.addDOMEventListener(listener);
			});
		}

		return {
			[RYAKT_ELEMENT_SYMBOL]: true,
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

		if (v.isTrue(this.isAppAlreadyRendered)) {
			throw new Error("App already rendered, you can't render the app multiple times");
		}

		target.appendChild(element.element);
		this.attachDOMEventsListeners();
		this.executeDidMountMethods();
		this.isAppAlreadyRendered = true;
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

	private executeDidMountMethods = async () => {
		resolvePromisesSequentially(this.didMountMethods.reverse());

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

// --- Constants ---

const RYAKT_ELEMENT_SYMBOL: unique symbol = Symbol("$ryakt_element");
const DOM_EVENTS_TYPES = ["click", "change", "keyup", "submit"] as const;

// --- Types ---

type T_RyaktElement = {
	[RYAKT_ELEMENT_SYMBOL]: true;
	element: HTMLElement;
	render: () => HTMLElement;
	toString: () => string;
};

type T_DOMEventHandler = [selector: string, handler: (ev: Event) => void];

type T_DOMEventHandlerWithEventName = U_Unshift<typeof DOM_EVENTS_TYPES[number], T_DOMEventHandler>;

type T_CreateElementPropsParam = {
	[key: string]: unknown;
	className?: string;
	onClick?: T_DOMEventHandler;
	onChange?: T_DOMEventHandler;
	onKeyUp?: T_DOMEventHandler;
} | null;

type T_DidMountMethod = () => unknown | Promise<unknown>;

// --- Utils ---

function isRyaktElement(input: unknown): input is T_RyaktElement {
	return v.isObject(input) && RYAKT_ELEMENT_SYMBOL in input;
}

function isEventListener(propName: string): boolean {
	const regex = new RegExp(/^on([A-Z]{1}[a-zA-Z]{4,10})$/, "g");
	const results = Array.from(propName.matchAll(regex))[0];

	if (v.isUndefined(results)) {
		return false;
	}

	const eventName = results[1].toLowerCase() as typeof DOM_EVENTS_TYPES[number];

	return DOM_EVENTS_TYPES.includes(eventName);
}
