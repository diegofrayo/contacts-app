import v from "~/lib/validator";

export function isBrowser(): boolean {
	return isServer() === false;
}

export function isServer(): boolean {
	return typeof window === "undefined";
}

export async function resolvePromisesSequentially(tasks: (() => unknown | Promise<unknown>)[]) {
	const results = [];

	for (const task of tasks) {
		results.push(await task());
	}

	return results;
}

export function getTargetElement<G_HTMLElement>(event: Event): G_HTMLElement {
	if (v.isNull(event.target)) {
		throw new Error("Target element is null unexpectedly");
	}

	return event.target as G_HTMLElement;
}

export function replaceAll(str: string, toReplace: string | string[], replacement: string): string {
	if (Array.isArray(toReplace)) {
		return toReplace.reduce(
			(result, item) => result.replace(new RegExp(escapeRegExp(item), "g"), replacement),
			str,
		);
	}

	return str.replace(new RegExp(escapeRegExp(toReplace), "g"), replacement);
}

// --- Private ---

function escapeRegExp(text: string): string {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
