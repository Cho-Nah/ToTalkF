import React, {useCallback} from "react";
import createClassName from "../../utils/createClassName";
import {AnyCallback, rangleColor} from "../../types";

import Ripple from "./Ripple";

import "./Radio.scss";

export type OwnProps = {
  name: string;
  value: string;
  onChange: AnyCallback<string>;

  className?: string;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  isRipple?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  isHoverDisabled?: boolean;
  color?: rangleColor;
} 

const Radio: React.FC<OwnProps> = ({
  value,
  className,
  label,
  sublabel,
  color = "primary",
  isDisabled,
  isChecked,
  isRipple,
  isHoverDisabled,
  onChange
}) => {
  const handleChange = useCallback(() => {
    if (isDisabled) {
      return;
    }

    onChange(value);
  }, [onChange, isDisabled, value]);

  const fullClassName = createClassName(
    "Radio", 
    className,
    "color-" + color,
    isChecked && "checked",
    isDisabled && "disabled",
    isRipple && "ripple",
    isHoverDisabled && "hover-disabled"
  );

  return (
    <label className={fullClassName}>
      <div className="input">
        <input
          type="radio"
          className="hidden"
          onChange={handleChange}
          value={value}
          checked={isChecked}
        />
					
        <div className="animation">
          <div className="circle" />
        </div>
      </div>

      {label && <div className="label">
        <div className="title">{label}</div>
        {sublabel && <div className="subtitle">{sublabel}</div>}
      </div>}

      {isRipple && <Ripple />}
    </label>
  );
}

export default Radio;