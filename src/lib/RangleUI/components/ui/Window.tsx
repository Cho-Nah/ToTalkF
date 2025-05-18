import React, {
  useRef,
  useState,
  useEffect, 
  useContext,
  useCallback
} from "react";

import Keyboard from "../../utils/keyboard";
import {debounce} from "../../utils/schedulers";
import createClassName from "../../utils/createClassName";
import {ManagerContext} from "./WindowManager";
import {AnyCallback, AnyFunction} from "../../types";

import Menu from "./Menu";
import Button from "./Button";
import TouchEngine from "../../utils/touchEngine";
import MenuItem, {OwnProps as MenuItemProps} from "./MenuItem"

import "./Window.scss";

export type OwnProps = {
  id?: number;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  isRoot?: boolean;
  isClosed?: boolean;
  isPrevious?: boolean;
  isHeaderDisabled?: boolean;
  options?: MenuItemProps[];
  isTouchDisabled?: boolean;

  onMove?: AnyFunction;
  onClose?: AnyCallback<number>;
  onSwipe?: AnyCallback<number>;
}

const Window: React.FC<OwnProps> = ({
  id,
  title,
  children,
  className,
  isOpen,
  isRoot,
  isClosed,
  isPrevious,
  isHeaderDisabled,
  options,
  isTouchDisabled,
  onClose,
  onSwipe,
  onMove
}) => {
  const {managerRef} = useContext(ManagerContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<TouchEngine>(undefined);

  const handleBackClick = useCallback(() => {
    if (onSwipe) {
      onSwipe(id!);
    }
  }, [id, onSwipe]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    setIsScrolled(element.scrollTop > 24);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!managerRef.current) {
      throw new Error("[RangleUI] Please, do not use Window component outside of WindowManager");
    }

    if (!engineRef.current && windowRef.current && !isRoot && !isTouchDisabled) {
      const engine = new TouchEngine(windowRef.current, {
        onMove,
        onClose: () => onClose && onClose(id!),
        onSwipe: () => onSwipe && onSwipe(id!),
        manager: managerRef.current || undefined
      });

      engine.allowMoveOnlyByCorner = true;
      engineRef.current = engine;
    }

    if (!isRoot) {
      Keyboard.registerDisposable("Escape", debounce(handleBackClick, 200, false));
    }
  }, [
    id, isOpen, isRoot, isTouchDisabled, 
    managerRef, onClose, onMove, onSwipe, handleBackClick
  ]);

  if (isClosed) {
    engineRef.current?.smoothClose();
  }

  const fullClassName = createClassName(
    "Window",
    className,
    isRoot && "root",
    isOpen && "open",
    isClosed && "closed",
    isPrevious && "previous",
    isHeaderDisabled && "no-header",
    isScrolled && "scrolled"
  );

  const renderHeader = () => {
    return (
      <div className="window-header">
        {!isRoot && <Button 
          type="icon"
          className="back-button"
          icon={{ name: "arrow_back" }}
          onClick={handleBackClick}
        />}

        <div className="title">{title}</div>
        
        {options && <Button 
          type="icon"
          icon={{ name: "more_vert" }}
        >
          <Menu directionX="left">
            {options.map((option, i) => <MenuItem {...option} key={i} />)}
          </Menu>
        </Button>}
      </div>
    )
  }

  return (
    <div className={fullClassName} ref={windowRef}>
      {!isHeaderDisabled && renderHeader()}

      <div className="window-content custom-scroll" onScroll={handleScroll}>
        {children}
      </div>
    </div>
  );
}

export default Window;