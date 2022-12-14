import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
	resolve: {
		alias: [{ find: "~", replacement: path.resolve(__dirname, "/src") }],
	},
	plugins: [
		viteStaticCopy({
			targets: [
				{
					src: "src/assets",
					dest: "",
				},
			],
		}),
	],
});
