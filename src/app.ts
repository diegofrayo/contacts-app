import Layout from "~/components/Layout";
import Ryakt from "~/lib/ryakt";

window.addEventListener("DOMContentLoaded", () => {
	Ryakt.renderDOM(Layout(), document.getElementById("app"));
});
