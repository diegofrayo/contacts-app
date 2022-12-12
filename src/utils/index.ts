export async function resolvePromisesSequentially(tasks: (() => unknown | Promise<unknown>)[]) {
	const results = [];

	for (const task of tasks) {
		results.push(await task());
	}

	return results;
}
