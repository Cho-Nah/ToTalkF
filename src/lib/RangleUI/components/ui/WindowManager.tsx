import React, {useRef, useState} from "react";
import createClassName from "../../utils/createClassName";
import Window, {OwnProps as WindowProps} from "./Window";

import "./WindowManager.scss";

type WindowObject = Omit<WindowProps, "id">;

export interface IManagerContext {
  windows: WindowProps[];
  managerRef: React.RefObject<HTMLDivElement | null>;

  /**
   * @param window new window as a Window component
   * @returns id of the created window
   */
  createWindow: (window: React.ReactElement<WindowObject>) => number;
  closeWindow: (windowId?: number) => void;
  removeWindow: (windowId?: number) => void;
}

export const ManagerContext = React.createContext<IManagerContext>({
  windows: [],
  managerRef: { current: null },
  createWindow: () => 0,
  closeWindow: () => void 0,
  removeWindow: () => void 0
});

let windowId = 0;

type OwnProps = {
  className?: string;
  children: React.ReactElement<WindowObject>;
}

const WindowManager: React.FC<OwnProps> = ({ className,  children }) => {
  const managerRef = useRef<HTMLDivElement>(null);
  const [windows, setWindows] = useState<WindowProps[]>([
    { ...children.props, id: windowId }
  ]);

  const createWindow = (window: React.ReactElement<WindowObject>) => {
    const id = ++windowId;
    console.log(window);
    
    setWindows(prev => [
      ...prev, 
      { ...window.props, id }
    ]);

    return id;
  }

  const closeWindow = (windowId?: number) => {
    setWindows(prev => {
      windowId = windowId ?? prev[prev.length - 1].id;
      const window = prev.find(window => window.id === windowId);

      if (!window) {
        return prev;
      }

      window.isClosed = true;

      return [...prev];
    });
  }

  const removeWindow = (windowId?: number) => {
    setWindows(prev => {
      if (prev.length === 1) {
        return prev;
      }

      windowId = windowId ?? prev[prev.length - 1].id;
      prev = prev.filter(window => window.id !== windowId);

      return [...prev];
    });
  }

  return (
    <ManagerContext.Provider value={{
      windows,
      managerRef,
      createWindow,
      closeWindow,
      removeWindow
    }}>
      <div className={createClassName("WindowManager", className)} ref={managerRef}>
        {windows.map((window, index, array) => {
          const isRoot = index === 0;
          const isPrevious = index === array.length - 2;
          const isOpen = !window.isClosed && index === array.length - 1;

          return (
            <Window 
              id={window.id}
              key={window.id}
              title={window.title}
              className={window.className}
              isOpen={isOpen}
              isRoot={isRoot}
              isClosed={window.isClosed}
              isPrevious={isPrevious && !isOpen}
              isHeaderDisabled={window.isHeaderDisabled}
              options={window.options}
              onClose={removeWindow}
              onSwipe={closeWindow}
            >
              {window.children}
            </Window>
          )
        })}
      </div>
    </ManagerContext.Provider>
  );
}

export default WindowManager;