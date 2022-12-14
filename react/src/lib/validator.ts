import type { T_Object } from "~/types";

// --- Primitives ---

function isNull(input: unknown): input is null {
	return input === null;
}

function isFunction(input: unknown): boolean {
	return typeof input === "function";
}

function isArray<G_ItemsType>(input: unknown): input is G_ItemsType[] {
	return Array.isArray(input);
}

function isArrayOf<G_ItemsType>(input: unknown, type: "string"): input is G_ItemsType[] {
	return Array.isArray(input) && input.every((item) => typeof item === type);
}

function isUndefined(input: unknown): input is undefined {
	return typeof input === "undefined";
}

function isObject(input: unknown): input is T_Object {
	if (!input || Array.isArray(input)) return false;
	return typeof input === "object";
}

function isString(input: unknown): input is string {
	return typeof input === "string";
}

function isNumber(input: unknown): input is number {
	return typeof input === "number";
}

function isBoolean(input: unknown): input is boolean {
	return typeof input === "boolean";
}

function isDate(input: unknown): input is Date {
	return input instanceof Date;
}

// --- Generics ---

function isTrue(input: unknown): input is boolean {
	return input === true;
}

function isNotTrue(input: unknown): input is boolean {
	return input === false;
}

function isNotUndefined(input: unknown): boolean {
	return input !== undefined;
}

function isFalsy(input: unknown): boolean {
	return !input;
}

function isNotEquals(input1: unknown, input2: unknown): boolean {
	return input1 !== input2;
}

function isEquals(input1: unknown, input2: unknown): boolean {
	return input1 === input2;
}

// --- Strings ---

function isEmptyString(input: unknown): boolean {
	return typeof input === "string" && input.length === 0;
}

function isNotEmptyString(input: unknown): input is string {
	return typeof input === "string" && input.length > 0;
}

// --- Numbers ---

function isBetween(input: number, range: [number, number]): boolean {
	return input >= range[0] && input <= range[1];
}

// --- Arrays ---

function isNotEmptyArray(input: unknown): input is unknown[] {
	return Array.isArray(input) && input.length > 0;
}

function isEmptyArray(input: unknown): boolean {
	return Array.isArray(input) && input.length === 0;
}

// --- Semantic ---

function notFound(input: unknown): input is undefined {
	return input === undefined;
}

function exists(input: unknown): boolean {
	return input !== undefined;
}

// --- DOM ---

function isDOMNode(element: unknown): element is Node {
	return "nodeType" in (isObject(element) ? element : {});
}

const API = {
	isNull,
	isFunction,
	isArray,
	isArrayOf,
	isUndefined,
	isString,
	isNumber,
	isBoolean,
	isDate,
	isObject,

	isTrue,
	isNotTrue,
	isNotUndefined,
	isFalsy,
	isNotEquals,
	isEquals,

	isEmptyString,
	isNotEmptyString,

	isBetween,

	isNotEmptyArray,
	isEmptyArray,

	notFound,
	exists,

	isDOMNode,
};

export default API;
