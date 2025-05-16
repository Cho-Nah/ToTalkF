type Key = 
  "Enter" 
  | "Control" 
  | "Backspace" 
  | "Delete" 
  | "Escape" 
  | "ArrowUp" 
  | "ArrowDown" 
  | "ArrowLeft" 
  | "ArrowRight" 
  | "Tab";
type KeyHandler = (e: KeyboardEvent) => void;

const keyToHandlerName: Record<string, Key> = {
  Enter: "Enter",
  Control: "Control",
  Backspace: "Backspace",
  Delete: "Delete",
  Escape: "Escape",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Tab: "Tab"
}

class Keyboard {
  private static handlers: Record<Key, KeyHandler[]> = {
    Enter: [],
    Control: [],
    Delete: [],
    Backspace: [],
    Escape: [],
    ArrowUp: [],
    ArrowDown: [],
    ArrowLeft: [],
    ArrowRight: [],
    Tab: []
  }

  private static hasActiveHandlers() {
    return Object.values(this.handlers).some(keyHandlers => Boolean(keyHandlers.length));
  }

  private static getHandlers(key: KeyboardEvent["key"]): KeyHandler[] | null {
    const handlerName = keyToHandlerName[key];

    if (!handlerName) {
      return null;
    }

    const handlers = this.handlers[handlerName];

    if (!handlers.length) {
      return null;
    }

    return handlers;
  }

  private static handleKeyDown(e: KeyboardEvent) {
    const handlers = this.getHandlers(e.key);

    if (!handlers) {
      return;
    }

    e.stopPropagation();
    
    handlers[handlers.length - 1](e);
  }

  public static remove(key: Key, handler: KeyHandler) {
    const handlers = this.getHandlers(key);

    if (!handlers) {
      return;
    }

    const index = handlers.findIndex(cb => cb === handler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }

    if (!this.hasActiveHandlers()) {
      document.removeEventListener("keydown", this.handleKeyDown, false);
    }
  }

  public static register(key: Key, handler: KeyHandler) {
    if (!this.hasActiveHandlers()) {
      document.addEventListener("keydown", this.handleKeyDown.bind(this), true);
    }
  
    const currentEventHandlers = this.handlers[key];
    
    currentEventHandlers.push(handler);
  }

  /**
   * Registers a one-time key handler that will be removed after being called
   */
  public static registerDisposable(key: Key, handler: KeyHandler) {
    const callback = (e: KeyboardEvent) => {
      handler(e);

      this.remove(key, callback);
    }

    this.register(key, callback);
  }
}

export default Keyboard;