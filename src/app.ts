import Wrapper from "./components/Wrapper";
import { renderComponent } from "./utils/render";

window.addEventListener("DOMContentLoaded", () => {
	renderComponent(Wrapper(), document.getElementById("app"));
});
