/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: "fw-",
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		{
			pattern: /fw-my-|fw-mx-|fw-mt-|fw-mb-/,
			variants: ["sm", "md", "lg", "xl"],
		},
	],
};
