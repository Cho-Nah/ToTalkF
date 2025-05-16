import React, {useRef} from "react";
import {rangleColor} from "../../types";
import createClassName from "../../utils/createClassName";

import Ripple from "./Ripple";
import Badge, {OwnProps as BadgeProps} from "./Badge";

import "./Tab.scss";

export type OwnProps = {
  children?: React.ReactNode;
  badge?: BadgeProps;
  value: string;
  title?: string;
  isActive?: boolean;
  isRipple?: boolean;
  isDisabled?: boolean;
  isHoverDisabled?: boolean;
  onClick?: (ref: HTMLDivElement, value: string) => void;
  color?: rangleColor;
}

const Tab: React.FC<OwnProps> = ({
  color = "primary",
  children,
  badge,
  value,
  title,
  isActive,
  isRipple,
  isDisabled,
  isHoverDisabled,
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    if (onClick && containerRef.current) {
      onClick(containerRef.current, value);
    }
  }

  const fullClassName = createClassName(
    "Tab",
    "color-" + color,
    isActive && "active",
    isDisabled && "disabled",
    isHoverDisabled && "hover-disabled"
  );

  const contentClassName = createClassName(
    "content",
    isRipple && "ripple"
  );

  return (
    <div
      title={title}
      ref={containerRef}
      onClick={handleClick}
      className={fullClassName}
      data-value={value}
    >
      <div className={contentClassName}>
        <div className="label ellipsis">
          {children || value}
          {badge && <Badge {...badge} />}
        </div>

        {isRipple && <Ripple />}
      </div>
    </div>
  );
}

export default Tab;