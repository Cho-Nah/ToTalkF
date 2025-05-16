import ReactDOM from "react-dom";
import React, {
  memo, 
  useRef, 
  useEffect,
  useCallback, 
  useLayoutEffect
} from "react";

import useFlag from "../../hooks/useFlag";
import Keyboard from "../../utils/keyboard";
import {debounce} from "../../utils/schedulers";
import {PORTALS_ID} from "../../display";
import useClickAway from "../../hooks/useClickAway";
import {AnyFunction} from "../../types";
import {limitNumber} from "../../utils/numbers";
import createClassName from "../../utils/createClassName";

import Ripple from "./Ripple";

import "./Menu.scss";

export type TargetType = "element" | "mouse";
export type TriggerType = "click" | "contextmenu" | "mouseover";

export type DirectionX = "left" | "right";
export type DirectionY = "top" | "bottom";

type Borders = {
  top: number;
  right: number;
  bottom: number
  left: number;
}

type Position = {
  x: number;
  y: number;
  originX: DirectionX;
  originY: DirectionY;
}

export type OwnProps = {
  className?: string;
  parent?: HTMLElement;
  children?: React.ReactNode;
  target?: TargetType;
  trigger?: TriggerType;
  isOpen?: boolean;
  isRipple?: boolean;
  isDisabled?: boolean;
  directionX?: DirectionX;
  directionY?: DirectionY;
  shouldWidthFit?: boolean;
  shouldInstantCancel?: boolean;
  shouldKeyboardCancel?: boolean;
  shouldClickAwayCancel?: boolean;
  onOpen?: AnyFunction;
  onCancel?: AnyFunction;
}

const MARGIN_FROM_TARGET = 8;
const MARGIN_FROM_PARENT = 8;
const ANIMATION_DURATION = 150;

const Menu: React.FC<OwnProps> = ({
  parent,
  children,
  className,
  target = "element",
  trigger = "click",
  isOpen = false,
  isDisabled,
  isRipple,
  directionX = "right",
  directionY = "bottom",
  shouldWidthFit,
  shouldInstantCancel = true,
  shouldKeyboardCancel = true,
  shouldClickAwayCancel = true,
  onOpen,
  onCancel
}) => {
  const [isMenuOpen, openMenu, closeMenu] = useFlag(isOpen);
  
  const listRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerEventRef = useRef<React.MouseEvent>(null);

  const handleTrigger = useCallback((e: React.MouseEvent) => {
    if (isMenuOpen || isDisabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
		
    openMenu();
    onOpen && onOpen();
    triggerEventRef.current = e;
  }, [isMenuOpen, isDisabled, openMenu, onOpen]);

  const handleCancel = useCallback(() => {
    const list = listRef.current;

    if (list) {
      list.classList.add("closed");
    }

    window.setTimeout(() => {
      closeMenu();

      if (onCancel) {
        onCancel();
      }
    }, ANIMATION_DURATION);
  }, [listRef, closeMenu, onCancel]);

  const getBorders = useCallback((): Borders => {
    let globalRight = window.visualViewport?.width ?? window.innerWidth;
    let globalLeft = window.visualViewport?.height ?? window.innerHeight;

    const borders = {
      top: 0,
      right: globalRight,
      bottom: globalLeft,
      left: 0
    }

    if (!parent) {
      return borders;
    }

    const parentBox = parent.getBoundingClientRect();

    borders.top = parentBox.y;
    borders.right = parentBox.x + parentBox.width;
    borders.bottom = parentBox.y + parentBox.height;
    borders.left = parentBox.x;

    return borders;
  }, [parent]);

  const getElementPosition = useCallback((): Position => {
    const borders = getBorders();
    const position: Position = {
      x: 0,
      y: 0,
      originX: "left",
      originY: "top"
    }

    const listBox = listRef.current?.getBoundingClientRect();
    const containerBox = containerRef.current?.getBoundingClientRect();

    if (!containerBox || !listBox) {
      return position;
    }

    let x = 0, y = 0;

    if (directionX === "left") {
      position.originX = "right";
      x = containerBox.x + containerBox.width - listBox.width;
    } else {
      x = containerBox.x;
    }

    if (directionY === "bottom") {
      y = containerBox.y + containerBox.height + MARGIN_FROM_TARGET;
    } else {
      position.originY = "bottom";
      y = containerBox.y - listBox.height - MARGIN_FROM_TARGET;
    }

    position.x = limitNumber(x, borders.left + MARGIN_FROM_PARENT, borders.right - listBox.width - MARGIN_FROM_PARENT);
    position.y = limitNumber(y, borders.top + MARGIN_FROM_PARENT, borders.bottom - listBox.height - MARGIN_FROM_PARENT);

    return position;
  }, [containerRef, listRef, getBorders, directionX, directionY]);

  const getMousePosition = useCallback((): Position => {
    const borders = getBorders();
    const position: Position = {
      x: 0,
      y: 0,
      originX: "left",
      originY: "top"
    }

    const listBox = listRef.current?.getBoundingClientRect();

    if (!triggerEventRef.current || !listBox) {
      return position;
    }

    const {clientX, clientY} = triggerEventRef.current;

    if (directionX === "right") {
      position.x = limitNumber(clientX + MARGIN_FROM_TARGET, -Infinity, borders.right - listBox.width - MARGIN_FROM_PARENT);
    } else {
      position.originX = "right";
      position.x = limitNumber(clientX - listBox.width - MARGIN_FROM_TARGET, borders.left + MARGIN_FROM_PARENT, Infinity);
    }

    if (directionY === "bottom") {
      position.y = limitNumber(clientY, -Infinity, borders.bottom - listBox.height - MARGIN_FROM_PARENT);
    } else {
      position.originY = "bottom";
      position.y = limitNumber(clientY - listBox.height, borders.top + MARGIN_FROM_PARENT, Infinity);
    }
    
    return position;
  }, [triggerEventRef, getBorders, directionX, directionY]);

  const handleOpen = useCallback(() => {
    if (!listRef.current || !isMenuOpen) {
      return;
    }

    let getPosition = target === "element" ? getElementPosition : getMousePosition;
    let position = getPosition();
    let list = listRef.current;

    if (shouldWidthFit) {
      let container = containerRef.current!;
      list.style.width = container.offsetWidth + "px";
    }

    list.style.top = position.y + "px";
    list.style.left = position.x + "px";
    list.style.transformOrigin = `${position.originX} ${position.originY}`;
    list.classList.add("open");
  }, [isMenuOpen, getElementPosition, getMousePosition, target, shouldWidthFit]);

  useEffect(() => {
    window.addEventListener("resize", handleOpen);

    return () => {
      window.removeEventListener("resize", handleOpen);
    }
  }, [handleOpen]);
 
  useEffect(() => {
    if (!isMenuOpen || !shouldKeyboardCancel) {
      return;
    }

    Keyboard.registerDisposable(
      "Escape",
      debounce(handleCancel, ANIMATION_DURATION, false)
    );
  }, [isMenuOpen, shouldKeyboardCancel, handleCancel]);

  useClickAway(listRef, () => {
    if (isMenuOpen && shouldClickAwayCancel) {
      handleCancel();
    }
  });

  useLayoutEffect(handleOpen, [isMenuOpen, handleOpen]);

  const renderMenu = () => {
    const portals = document.getElementById(PORTALS_ID) as HTMLDivElement;
    const listClassName = createClassName(
      "menu-list",
      className,
      shouldWidthFit && "width-fit"
    );

    return ReactDOM.createPortal((
      <div 
        ref={overlayRef}
        className="menu-overlay"
      >
        <div 
          ref={listRef}
          className={listClassName}
          onClick={shouldInstantCancel ? handleCancel : undefined}
        >
          {children}
        </div>
      </div>
    ), portals);
  }

  const fullClassName = createClassName(
    "Menu",
    isRipple && "ripple",
    isDisabled && "disabled"
  );

  return (
    <div 
      ref={containerRef}
      className={fullClassName}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onContextMenu={trigger === "contextmenu" ? handleTrigger : undefined}
      onMouseOver={trigger === "mouseover" ? handleTrigger : undefined}
    >
      {isMenuOpen && renderMenu()}

      {isRipple && <Ripple />}
    </div>
  );
}

export default memo(Menu);