import React from "react";
import createClassName from "../../utils/createClassName";
import {AnyCallback, rangleColor, rangleTypeExtended} from "../../types";

import Loader from "./Loader";
import Ripple from "./Ripple";
import Icon, {OwnProps as IconProps} from "./Icon";

import "./Button.scss";

export type OwnProps = {
  icon?: Omit<IconProps, "onClick">;
  children?: React.ReactNode;
  title?: string;
  className?: string;
  color?: rangleColor;
  type?: rangleTypeExtended;
  isRipple?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isHoverDisabled?: boolean;
  onClick?: AnyCallback<React.MouseEvent>;
  onContextMenu?: AnyCallback<React.MouseEvent>;
}

const Button: React.FC<OwnProps> = ({
  icon,
  children,
  title,
  className,
  color = "primary",
  type,
  isRipple,
  isDisabled,
  isLoading,
  isHoverDisabled,
  onClick,
  onContextMenu
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!onClick || isDisabled || isLoading) {
      return;
    }

    onClick(e);
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onContextMenu || isDisabled || isLoading) {
      return;
    }

    onContextMenu(e);
  }

  const fullClassName = createClassName(
    "Button", 
    type, 
    className,
    "color-" + color, 
    isRipple && "ripple",
    isDisabled && "disabled",
    isLoading && "loading",
    isHoverDisabled && "hover-disabled",
    (type !== "icon" && icon) && "with-icon"
  );
    
  return (
    <div 
      title={title}
      role="button"
      className={fullClassName}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {isLoading && <Loader />}

      <div className="content centered">
        {icon && <Icon {...icon} />}
        {<div className="text">{children}</div>}
      </div>

      {!isDisabled && isRipple && <Ripple /> }
    </div>
  );
}

export default Button;