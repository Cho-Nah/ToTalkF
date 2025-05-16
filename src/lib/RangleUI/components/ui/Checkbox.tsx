import React from "react";
import createClassName from "../../utils/createClassName";
import {AnyCallback, rangleColor} from "../../types";

import Ripple from "./Ripple";

import "./Checkbox.scss";

type OwnProps = {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isRipple?: boolean;
  isHoverDisabled?: boolean;
  color?: rangleColor;
  onChange: AnyCallback<boolean>; 
}

const Checkbox: React.FC<OwnProps> = ({
  label,
  sublabel,
  className,
  isChecked = false,
  isDisabled,
  isRipple,
  isHoverDisabled = false,
  color = "primary",
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    var target = e.currentTarget;

    onChange(target.checked);
  }

  const hasLabel = Boolean(label);

  const fullClassName = createClassName(
    "Checkbox",
    className,
    "color-" + color,
    hasLabel && "has-label",
    isRipple && "ripple",
    isChecked && "checked",
    isDisabled && "disabled",
    isHoverDisabled && "hover-disabled"
  );

  return (
    <label className={fullClassName}>
      <div className="input">
        <input
          tabIndex={1}
          type="checkbox"
          className="hidden"
          onChange={handleChange}
          checked={isChecked}
        />

        <div className="animation">
          <div className="border" />
          <div className="backdrop" />
          <svg className="check" viewBox="0 0 24 24">
            <path id="check" fill="none" d="M 4 12.2929 l 5 5 c 0.3905 0.3905 1.0237 0.3905 1.4142 0 l 11 -11" />
          </svg>
        </div>
      </div>

      {label && <div className="label">
        <div className="title">{label}</div>
        {sublabel && <div className="subtitle ellipsis">{sublabel}</div>}
      </div>}

      {isRipple && <Ripple />}
    </label>
  );
}

export default Checkbox;