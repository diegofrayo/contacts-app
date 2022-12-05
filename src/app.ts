import Layout from "~/components/Layout";
import { RyaktDOM } from "~/lib/ryakt";

window.addEventListener("DOMContentLoaded", () => {
	RyaktDOM.render(Layout(), document.getElementById("app"));
});
