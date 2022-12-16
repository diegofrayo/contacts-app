/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: "tw-",
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		{
			pattern: /tw-my-|tw-mx-|tw-mt-|tw-mb-/,
			variants: ["sm", "md", "lg", "xl"],
		},
	],
};
