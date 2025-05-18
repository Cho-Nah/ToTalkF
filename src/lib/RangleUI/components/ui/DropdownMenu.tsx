import React, {useCallback, useRef} from "react";
import useFlag from "../../hooks/useFlag";
import createClassName from "../../utils/createClassName";
import {AnyCallback, rangleColor} from "../../types";

import Menu, {DirectionY} from "./Menu";
import Icon from "./Icon";
import Input from "./Input";
import MenuItem from "./MenuItem";

import "./DropdownMenu.scss";

export type Option = {
  value: string;
  label?: string;
};

type OwnProps = {
  options: Option[];
  value: string | null;
  className?: string;
  directionY?: DirectionY;
  isDisabled?: boolean;
  placeholder?: string;
  isMultiple?: boolean;
  isNativePlaceholder?: boolean;
  shouldInstantCancel?: boolean;
  color?: rangleColor;
  onChange: AnyCallback<string>;
}

// TODO: multiple selection

const DropdownMenu: React.FC<OwnProps> = ({ 
  options, 
  className, 
  isDisabled, 
  value, 
  directionY,
  placeholder,
  isNativePlaceholder, 
  color = "primary", 
  shouldInstantCancel=false,
  onChange 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, openDropdown, closeDropdown] = useFlag();

  const handleClick = useCallback((option: Option) => {
    if (isDisabled) {
      return;
    }

    if (onChange) {
      onChange(option.value);
    }
  }, [isDisabled, onChange]);

  const fullClassName = createClassName(
    "DropdownMenu", 
    className, "color-" + color, 
    isOpen && "open", 
    isDisabled && "disabled",
    directionY === "top" && "upward",
  );

  const inputClassName = createClassName(isOpen && "focused");
  const activeOption = options.find(option => option.value === value);

  return (
    <div ref={dropdownRef} className={fullClassName}>
      <div className="preview" onClick={openDropdown}>
        <Input 
          isReadonly
          tabIndex={-1}
          color={color}
          placeholder={placeholder}
          className={inputClassName}
          isNativePlaceholder={isNativePlaceholder}
          value={activeOption ? (activeOption.label || activeOption.value) : ""}
        />
        
        <div className="animation">
          <Icon name="expand_more" />
        </div>
      </div>

      <Menu 
        shouldWidthFit
        onOpen={openDropdown}
        directionY={directionY}
        onCancel={closeDropdown} 
        shouldInstantCancel={shouldInstantCancel}
        className={createClassName("dropdown-menu-options", directionY === "top" && "upward")}
      >
        {options.map((option, i) => {
          const label = option.label || option.value;
          const isActive = Array.isArray(value) ? value.includes(option.value) : option.value === value;

          return <MenuItem 
            key={i} 
            isRipple
            isHoverDisabled
            onClick={() => handleClick(option)}
            color={isActive ? "primary" : "neutral"}
            className={createClassName(isActive && "active")}
          >
            <div className="label">{label}</div>
            {isActive && (
              <div className="animation">
                <svg className="check" viewBox="0 0 24 24">
                  <path id="check" fill="none" d="M 4 12.2929 l 5 5 c 0.3905 0.3905 1.0237 0.3905 1.4142 0 l 11 -11" />
                </svg>
              </div>
            )}
          </MenuItem>
        })}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
