import classNames from "classnames";

function Separator({ size, className }: { size: number; className?: string }) {
	return <hr className={classNames("Separator", `tw-my-${size} tw-border-0 tw-h-px`, className)} />;
}

export default Separator;
