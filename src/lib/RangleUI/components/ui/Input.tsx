import React, {useCallback} from "react";
import useFlag from "../../hooks/useFlag";
import createClassName from "../../utils/createClassName";
import {AnyCallback, rangleColor} from "../../types";

import Loader from "./Loader";

import "./Input.scss";

type OwnProps = {
  pattern?: RegExp;
  type?: React.HTMLInputTypeAttribute;
  ref?: React.RefObject<HTMLInputElement>;
  name?: string;
  title?: string;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  tabIndex?: number;
  maxLength?: number;
  ariaLabel?: string;
  inputMode?: "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";
  spellCheck?: boolean | "true" | "false";
  color?: rangleColor;
  value?: string | number | readonly string[];
  isLoading?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isNativePlaceholder?: boolean;
  onClick?: AnyCallback<React.MouseEvent<HTMLInputElement>>;
  onFocus?: AnyCallback<React.FocusEvent<HTMLInputElement>>;
  onBlur?: AnyCallback<React.FocusEvent<HTMLInputElement>>;
  onInput?: AnyCallback<React.KeyboardEvent<HTMLInputElement>>;
  onChange?: AnyCallback<React.ChangeEvent<HTMLInputElement>>;
}

const Input: React.FC<OwnProps> = ({
  type = "text",
  pattern,
  ref,
  name,
  title,
  className,
  placeholder,
  min,
  max,
  tabIndex,
  maxLength,
  spellCheck = false,
  autoComplete = "off",
  color = "primary",
  value,
  ariaLabel,
  isLoading,
  isReadonly,
  isDisabled,
  isRequired,
  inputMode,
  isNativePlaceholder,
  onClick,
  onFocus,
  onBlur,
  onInput,
  onChange
}) => {
  const [isFocused, enableFocus, disableFocus] = useFlag(false);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    if (onFocus) {
      onFocus(e);
    }

    enableFocus();
  }, [isDisabled, enableFocus, onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    if (onBlur) {
      onBlur(e);
    }

    disableFocus();
  }, [isDisabled, disableFocus, onBlur]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled || isReadonly) {
      return;
    }

    if (pattern && e.target.value && !pattern.test(e.target.value)) {
      return;
    }

    if (onChange) {
      onChange(e);
    }
  }, [isDisabled, isReadonly, pattern, onChange]);

  const fullClassName = createClassName(
    "Input",
    className,
    "color-" + color,
    isFocused && "focused",
    isLoading && "loading",
    isDisabled && "disabled",
    isNativePlaceholder && "native-placeholder"
  );

  return (
    <div className={fullClassName}>
      <input 
        ref={ref}
        type={type}
        name={name}
        title={title}
        value={value}
        disabled={isDisabled}
        maxLength={maxLength}
        placeholder={isNativePlaceholder ? placeholder : "*"}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        readOnly={isReadonly}
        tabIndex={tabIndex}
        min={min}
        max={max}
        inputMode={inputMode}
        required={isRequired}
        aria-label={ariaLabel}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={onClick}
        onInput={onInput}
        onChange={handleChange}
      />
			
      {isLoading && <Loader />}
      {placeholder && !isNativePlaceholder && <div className="placeholder">{placeholder}</div>}
    </div>
  );
}

export default Input;