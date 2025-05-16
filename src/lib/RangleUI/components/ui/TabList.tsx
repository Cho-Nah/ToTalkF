import React, {useRef, useState, useEffect, useCallback} from "react";
import {AnyCallback, rangleType} from "../../types";
import createClassName from "../../utils/createClassName";

import Tab, {OwnProps as TabProps} from "./Tab";

import "./TabList.scss";

interface OwnProps extends Omit<TabProps, "onClick" | "isActive" | "title" | "children"> {
  type?: rangleType;
  className?: string;
  tabs: Omit<TabProps, "onClick" | "isActive">[];
  onSwitch?: AnyCallback<string>;
}

type Animation = {
  left: string;
  width: string;
  transition: string;
}

const TRANSITION_DEFAULT = "all var(--duration-default)";

const TabList: React.FC<OwnProps> = ({
  tabs,
  type="default",
  value,
  color="primary",
  className,
  isRipple,
  isDisabled,
  isHoverDisabled,
  onSwitch
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationPos, setAnimationPos] = useState<Animation>({ 
    left: "0",
    width: "0", 
    transition: TRANSITION_DEFAULT
  });

  const handleTabClick = useCallback((ref: HTMLElement, value: string, noTransition=false, noChange=false) => {
    if (!containerRef.current) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeTabTextRect = ref.querySelector("div.label")?.getBoundingClientRect();

    if (!activeTabTextRect) {
      return;
    }
    
    var left = activeTabTextRect.left - containerRect.left + containerRef.current.scrollLeft;
    var width = activeTabTextRect.width;

    if (type === "secondary") {
      left -= 16;
      width += 32;
    }
		
    setAnimationPos({
      left: left + "px",
      width: width + "px",
      transition: noTransition ? "all 0ms" : TRANSITION_DEFAULT
    });

    if (!noTransition) {
      ref.scrollIntoView({ 
        behavior: "smooth", 
        inline: "center", 
        block: "nearest" 
      });
    }

    if (onSwitch && !noChange) {
      onSwitch(value);
    }
  }, [onSwitch, type]);

  const handleHorizontalWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) {
      return;
    }

    e.stopPropagation();
    containerRef.current.scrollLeft += e.deltaY / 2;
  }

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const activeElement = containerRef.current.querySelector(`.Tab[data-value="${value}"]`);

    if (activeElement) {
      handleTabClick(activeElement as HTMLElement, value, true, true);
    }
  }, [handleTabClick, value]);

  const activeTab = tabs.find(tab => tab.value === value);
  const fullClassName = createClassName(
    "TabList", 
    "custom-scroll",
    "custom-scroll-x",
    type, 
    className && className,
    "color-" + (activeTab?.color || color)
  );

  return (
    <div className={fullClassName} ref={containerRef} onWheel={handleHorizontalWheel}>
      <div className="horizontal-menu">
        {tabs.map((tab, i) => (
          <Tab 
            key={i}
            onClick={handleTabClick}
            isActive={activeTab?.value === tab.value}
            value={tab.value}
            title={tab.title}
            badge={tab.badge}
            children={tab.children}
            color={tab.color || color}
            isRipple={(tab.isRipple || isRipple)}
            isDisabled={tab.isDisabled || isDisabled}
            isHoverDisabled={tab.isHoverDisabled || isHoverDisabled}
          />
        ))}
      </div>
      
      <div className="animation" style={animationPos} />
    </div>
  );
}

export default TabList;