import Wrapper from "./components/Wrapper";
import { RyaktDOM } from "./lib/Ryakt";

window.addEventListener("DOMContentLoaded", () => {
	RyaktDOM.render(Wrapper(), document.getElementById("app"));
});
