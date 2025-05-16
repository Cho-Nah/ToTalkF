import ReactDOM from "react-dom";
import React, {
  useRef, 
  useState,
  useEffect,
  useCallback
} from "react";

import Keyboard from "../../utils/keyboard";
import {debounce} from "../../utils/schedulers";
import {PORTALS_ID} from "../../display";
import useClickAway from "../../hooks/useClickAway";
import createClassName from "../../utils/createClassName";
import {AnyCallback, AnyFunction} from "../../types";

import Button, {OwnProps as ButtonProps} from "./Button";

import "./Modal.scss";

export type CallbackButton = Omit<ButtonProps, "type" | "onClick" | "onContextMenu"> & {
  id: string;
}

export type OwnProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  buttons?: CallbackButton[];
  shouldCancelButton?: boolean;
  shouldInstantCancel?: boolean;
  shouldKeyboardCancel?: boolean;
  shouldClickAwayCancel?: boolean;
  onCancel?: AnyFunction;
  onButtonClick?: AnyCallback<string>;
}

const ANIMATION_DURATION = 150;
const DEFAULT_BUTTONS: OwnProps["buttons"] = [{
  id: "cancel",
  children: "Cancel"
}];

const Modal: React.FC<OwnProps> = ({
  title = "Message",
  children,
  className,
  isOpen = true,
  buttons = DEFAULT_BUTTONS,
  shouldCancelButton = true,
  shouldInstantCancel = true,
  shouldKeyboardCancel = true,
  shouldClickAwayCancel = true,
  onCancel,
  onButtonClick
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState(false);

  const handleCancel = useCallback(() => {
    setIsClosed(true);

    setTimeout(() => {
      setIsClosed(false);

      if (onCancel) {
        onCancel();
      }
    }, ANIMATION_DURATION);
  }, [onCancel]);

  const handleButtonClick = (id: string) => {
    if (shouldInstantCancel) {
      handleCancel();
    }

    if (onButtonClick) {
      onButtonClick(id);
    }
  }

  useEffect(() => {
    if (!isOpen || !shouldKeyboardCancel) {
      return;
    }

    Keyboard.registerDisposable(
      "Escape", 
      debounce(handleCancel, ANIMATION_DURATION, false)
    );
  }, [isOpen, shouldKeyboardCancel, handleCancel]);

  useClickAway(windowRef, () => {
    if (isOpen && shouldClickAwayCancel) {
      handleCancel();
    }
  });

  const portals = document.getElementById(PORTALS_ID) as HTMLDivElement;
  const fullClassName = createClassName(
    "Modal custom-scroll",
    className,
    isOpen && "open",
    isClosed && "closed",
    buttons.length > 2 && "column-buttons"
  );

  if (!isOpen) {
    return;
  }

  return ReactDOM.createPortal((
    <div 
      role="dialog"
      tabIndex={-1}
      className={fullClassName}
    >
      <div className="modal-window custom-scroll" ref={windowRef}>
        <div className="modal-header">
          <div className="title ellipsis">{title}</div>
          {shouldCancelButton && <Button 
            type="icon"
            icon={{ name: "close" }}
            title="Cancel"
            onClick={handleCancel}
          />}
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-buttons">
          {buttons.map((button, i) => (
            <Button
              key={i}
              isRipple={true}
              {...button}
              type="secondary"
              onClick={() => handleButtonClick(button.id)}
            />
          ))}
        </div>
      </div>
    </div>
  ), portals);
}

export default Modal;