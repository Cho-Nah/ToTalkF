import React, {useCallback, useId} from "react";
import {AnyCallback} from "../../types";
import createClassName from "../../utils/createClassName";

import Radio, {OwnProps as RadioProps} from "./Radio";

import "./RadioGroup.scss";

interface OwnProps extends Omit<RadioProps, "value" | "onChange" | "isChecked" | "name"> {
  buttons: Omit<RadioProps, "onChange" | "name">[];
  activeValue: RadioProps["value"] | null;
  onChange: AnyCallback<string>;
}

const RadioGroup: React.FC<OwnProps> = ({
  label,
  sublabel,
  buttons,
  className,
  color,
  isDisabled,
  isHoverDisabled,
  isRipple,
  activeValue,
  onChange
}) => {
  const handleChange = useCallback((value: string) => {
    if (isDisabled) {
      return;
    }

    onChange(value);
  }, [onChange, isDisabled]);

  const inputName = useId();

  const fullClassName = createClassName(
    "RadioGroup",
    className,
    isDisabled && "disabled"
  );

  return (
    <div className={fullClassName}>
      {label && <div className="label">
        <div className="title">{label}</div>
        {sublabel && <div className="subtitle">{sublabel}</div>}
      </div>}

      <div className="group">
        {buttons.map((button, i) => (
          <Radio 
            key={i}
            name={inputName}
            onChange={handleChange}
            value={button.value}
            label={button.label}
            sublabel={button.sublabel}
            className={button.className}
            color={button.color || color}
            isRipple={button.isRipple || isRipple}
            isChecked={activeValue === button.value}
            isDisabled={button.isDisabled || isDisabled}
            isHoverDisabled={button.isHoverDisabled || isHoverDisabled}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;