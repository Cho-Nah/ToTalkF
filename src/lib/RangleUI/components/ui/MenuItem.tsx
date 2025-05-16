import React from "react";
import createClassName from "../../utils/createClassName";

import Button, {OwnProps as ButtonProps} from "./Button";

import "./MenuItem.scss";

export type OwnProps = Omit<ButtonProps, "type">;

const MenuItem: React.FC<OwnProps> = ({
  icon,
  title,
  className,
  color = "neutral",
  children,
  isRipple,
  isDisabled,
  isLoading,
  isHoverDisabled,
  onClick,
  onContextMenu
}) => {
  const fullClassName = createClassName("MenuItem", className);

  return <Button
    icon={icon}
    color={color}
    title={title}
    className={fullClassName}
    isRipple={isRipple}
    isDisabled={isDisabled}
    isLoading={isLoading}
    isHoverDisabled={isHoverDisabled}
    type="secondary"
    onClick={onClick}
    onContextMenu={onContextMenu}
  >
    {children}
  </Button>
}

export default MenuItem;