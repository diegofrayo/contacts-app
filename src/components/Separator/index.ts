import classNames from "classnames";

import Ryakt from "~/lib/ryakt";

function Separator({ size }: { size: number }) {
	return Ryakt.createElement("hr", {
		className: classNames("Separator", `fw-my-${size} fw-border-0`),
	});
}

export default Separator;
