import classNames from "classnames";

import Ryakt from "~/lib/ryakt";

function Separator({ size }: { size: number }) {
	return Ryakt.createElement("hr", {
		className: classNames("Separator", `tw-my-${size} tw-border-0 tw-h-px`),
	});
}

export default Separator;
