import React from "react";
import {AnyFunction} from "../../types";
import createClassName from "../../utils/createClassName";

import "./Icon.scss";

export type OwnProps = {
  name: string;
  isFilled?: boolean;
  title?: string;
  className?: string;
  onClick?: AnyFunction;
}

const Icon: React.FC<OwnProps> = ({ 
  name,
  title,
  isFilled,
  onClick,
  className
}) => {
  const fullClassName = createClassName(
    "Icon",
    className,
    isFilled && "filled"
  );

  return (
    <span 
      title={title}
      onClick={onClick}
      className={fullClassName}
    >
      {name}
    </span>
  );
}

export default Icon;