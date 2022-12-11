import { resolvePromisesSequentially } from "~/utils/misc";
import type { U_Unshift } from "~/types";

import v from "./validator";

type T_DOMEventHandler = [selector: string, handler: (ev: Event) => void];
type T_DOMEventHandlerWithEventName = U_Unshift<
	"click" | "change" | "keyup" | "submit",
	T_DOMEventHandler
>;
type T_CreateElementPropsParam = {
	[key: string]: unknown;
	className?: string;
	onClick?: T_DOMEventHandler;
	onChange?: T_DOMEventHandler;
	onKeyUp?: T_DOMEventHandler;
} | null;
type T_DidMountMethod = () => unknown | Promise<unknown>;

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
					// TODO: [Diego] Create regex for event handlers (2)
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

		if (options?.DOMEventsListeners) {
			options.DOMEventsListeners.forEach((listener) => {
				this.addDOMEventListener(listener);
			});
		}

		return {
			// TODO: [Diego] Try to use symbols to identify this kind of objects (3)
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

		if (v.isTrue(this.isAppAlreadyRendered)) {
			throw new Error("App already rendered, you can't render the app multiple times");
		}

		target.appendChild(element.element);
		this.executeDidMountMethods();
		this.attachDOMEventsListeners();
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

// --- Types ---

// TODO: [Diego] Remove any (2)
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
