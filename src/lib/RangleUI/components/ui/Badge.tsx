import React from "react";
import {rangleColor} from "../../types";
import createClassName from "../../utils/createClassName";

import Icon, {OwnProps as IconProps} from "./Icon";

import "./Badge.scss";

export type OwnProps = {
  icon?: IconProps;
  className?: string;
  children?: string | number;
  color?: rangleColor;
}

const Badge: React.FC<OwnProps> = ({
  icon,
  children,
  className,
  color="neutral"
}) => {
  const hasChildren = children !== undefined;
  const fullClassName = createClassName(
    "Badge",
    className,
    "color-" + color,
    (icon && !hasChildren) && "icon-badge"
  );

  return (
    <div className={fullClassName}>
      {icon && <Icon {...icon} />}
      {children}
    </div>
  );
}

export default Badge;