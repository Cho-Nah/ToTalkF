import {fitNumber, getPercentage, toDegrees} from "./numbers";

type EngineOptions = Partial<{
  manager: HTMLElement
  onMove: () => void;
  onClose: () => void;
  onSwipe: () => void;
}>

const CORNER_MOVE_THRESHOLD = 40; // px

class TouchEngine {
  public element: HTMLElement;
  public manager: HTMLElement;
  public previous: HTMLElement | null;

  private options: EngineOptions;

  private startX: number;
  private startY: number;
  private moveX: number;
  private moveY: number;

  //private top: number;
  private left: number;

  public allowMove: boolean;
  public allowVerticalMove: boolean;
  public allowHorizontalMove: boolean;
  public allowMoveOnlyByCorner: boolean;

  public limitLeft: number;
  public limitRight: number;
  public limitTop: number;
  public limitBottom: number;

  private frames: number;
  private direction: string | null;

  public transitionDuration: number;
  private transition: string;
  private _isClosed = false;

  constructor(element: HTMLElement, options: EngineOptions = {}) {
    this.element = element;
    this.manager = options.manager || document.querySelector(".WindowManager")!;

    let windows = Array.from(this.manager.querySelectorAll<HTMLElement>(".Window")).filter(window => {
      return !window.classList.contains("closed") && !window.classList.contains("open");
    });

    this.previous = windows.pop() || null;

    this.options = {
      onMove: () => void 0,
      onClose: () => void 0,
      onSwipe: () => void 0,
      ...options
    };

    this.startX = 0;
    this.startY = 0;
    this.moveX = 0;
    this.moveY = 0;

    //this.top = 0;
    this.left = 0;

    this.allowMove = true;
    this.allowVerticalMove = false;
    this.allowHorizontalMove = true;
    this.allowMoveOnlyByCorner = false;

    this.limitLeft = 0;
    this.limitRight = Infinity;
    this.limitTop = 0;
    this.limitBottom = Infinity;

    this.frames = 0;
    this.direction = null;

    this.transitionDuration = 260;
    this.transition = `all ${this.transitionDuration}ms ease-in-out`;

    this.element.addEventListener("touchstart", this.onStart.bind(this));
    this.element.addEventListener("touchmove", this.onMove.bind(this));
    this.element.addEventListener("touchend", this.onEnd.bind(this));

    setTimeout(() => {
      this.initialOpen();
    }, 0);
  }

  private initialOpen() {
    this.element.style.transform = `translate3d(0, 0, 0)`;

    if (this.previous) {
      this.previous.style.transform = "translate3d(-50%, 0, 0)";
      this.previous.style.filter = "brightness(0.75)";
      this.previous.style.pointerEvents = "none";
    }
  }

  private onHorizontalMove(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();

    const {deltaX} = this.getDelta();
    const {onMove} = this.options;

    const left = Math.min(Math.max(this.left + deltaX, this.limitLeft), this.limitRight);

    this.element.style.transition = "all 0ms";
    this.element.style.transform = `translate3d(${left}px, 0, 0)`;

    if (left >= this.element.offsetWidth) {
      this.onEnd();
      return;
    }

    if (this.previous) {
      let managerRect = this.manager.getBoundingClientRect();
      let previousRect = this.previous.getBoundingClientRect();
      
      if (previousRect.x - managerRect.x >= 0) {
        return;
      }
      
      let percent = getPercentage(left / 2, previousRect.width / 2);
      let brightness = fitNumber(percent, 0, 100, 0.75, 1);
      let translateX = fitNumber(percent, 0, 100, -previousRect.width / 2, 0);

      this.previous.style.transition = "all 0ms";
      this.previous.style.transform = `translate3d(${translateX}px, 0, 0)`;
      this.previous.style.filter = `brightness(${brightness})`;
    }

    if (onMove) {
      onMove();
    }
  }

  private onVerticalMove() {
    throw new Error("Not Implemented");
  }

  private onStart(event: TouchEvent) {
    if (!this.allowMove) {
      return;
    }

    const touch = event.changedTouches[0];
    const elementRect = this.element.getBoundingClientRect();

    this.frames = 0;
    this.direction = null;

    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.moveX = touch.clientX;
    this.moveY = touch.clientY;

    if (touch.clientX - elementRect.x > CORNER_MOVE_THRESHOLD && this.allowMoveOnlyByCorner) {
      this.allowMove = false;
    }
  }

  private onMove(event: TouchEvent) {
    if (!this.allowMove) {
      return;
    }

    const touch = event.changedTouches[0];

    this.moveX = touch.clientX;
    this.moveY = touch.clientY;

    if (!this.frames) {
      this.direction = this.getDirection();
    }

    if (this.allowVerticalMove && this.direction === "vertical") {
      this.onVerticalMove();
    }

    if (this.allowHorizontalMove && this.direction === "horizontal") {
      this.onHorizontalMove(event);
    }

    this.frames += 1;
  }

  private onEnd() {
    const {deltaX} = this.getDelta();

    if (this.direction !== "horizontal") {
      this.allowMove = true;
      return;
    }

    this.allowMove = false;
    this.direction = null;
    this.element.style.transition = this.transition;

    if (this.left + deltaX < this.element.offsetWidth / 5) {
      this.smoothReturn();
      return;
    }

    if (this.options.onSwipe) {
      this.options.onSwipe();
    }
  }

  public smoothClose() {
    if (this._isClosed) {
      return;
    }

    this.element.style.transition = this.transition;
    this.element.style.transform = "translate3d(100%, 0, 0)";

    if (this.previous) {
      this.previous.style.transition = this.transition;
      this.previous.style.filter = "brightness(1)";
      this.previous.style.pointerEvents = "all";
      this.previous.style.transform = "translate3d(0, 0, 0)";
    }

    this._isClosed = true;

    if (this.options.onClose) {
      setTimeout(this.options.onClose, this.transitionDuration);
    }
  }

  public smoothReturn() {
    this.element.style.transition = this.transition;
    this.element.style.top = "0";
    this.element.style.transform = "translate3d(0, 0, 0)";

    if (this.previous) {
      this.previous.style.transition = this.transition;
      this.previous.style.transform = "translate3d(-50%, 0, 0)";
    }

    setTimeout(() => {
      this.allowMove = true;
    }, this.transitionDuration);
  }

  private getDelta() {
    return {
      deltaX: this.moveX - this.startX,
      deltaY: this.moveY - this.startY
    };
  }

  private getDirection() {
    const {deltaX, deltaY} = this.getDelta();
    const angle = toDegrees(Math.atan(deltaX / deltaY));

    return Math.abs(angle) > 70 ? "horizontal" : "vertical";
  }
}

export default TouchEngine;
