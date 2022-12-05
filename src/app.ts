import Wrapper from "./components/Wrapper";
import { RyaktDOM } from "./lib/ryakt";

window.addEventListener("DOMContentLoaded", () => {
	RyaktDOM.render(Wrapper(), document.getElementById("app"));
});
