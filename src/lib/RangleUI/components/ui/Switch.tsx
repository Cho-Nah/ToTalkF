import React, {useCallback} from "react";
import {AnyCallback, rangleColor} from "../../types";
import createClassName from "../../utils/createClassName";

import Ripple from "./Ripple";

import "./Switch.scss";

type OwnProps = {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  title?: string;
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isRipple?: boolean;
  isSeparated?: boolean;
  isHoverDisabled?: boolean;
  color?: rangleColor;
  onChange: AnyCallback<boolean>;
};

const Switch: React.FC<OwnProps> = ({ 
  label, 
  sublabel, 
  className, 
  isRipple, 
  isChecked = false, 
  isDisabled = false, 
  isSeparated, 
  isHoverDisabled = false, 
  color = "primary", 
  onChange 
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    const target = e.currentTarget;

    onChange(target.checked);
  }, [onChange, isDisabled]);

  const hasLabel = Boolean(label);
  const shouldSeparate = hasLabel && isSeparated;

  const fullClassName = createClassName(
    "Switch", 
    className, "color-" + color, 
    hasLabel && "has-label", 
    isChecked && "checked", 
    isDisabled && "disabled", 
    isRipple && "ripple", 
    shouldSeparate && "separated", 
    isHoverDisabled && "hover-disabled"
  );

  return (
    <label className={fullClassName}>
      {hasLabel && (
        <div className="label">
          <div className="title ellipsis">{label}</div>
          {sublabel && <div className="subtitle ellipsis">{sublabel}</div>}
        </div>
      )}

      <div className="input">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
        />

        <div className="animation">
          <div className="backdrop" />
          <div className="circle" />
        </div>
      </div>

      {isRipple && <Ripple />}
    </label>
  );
};

export default Switch;
