import classNames from "classnames";

function Separator({ size }: { size: number }) {
  return (
    <hr
      className={classNames("Separator", `fw-my-${size} fw-border-0 fw-h-px`)}
    />
  );
}

export default Separator;
