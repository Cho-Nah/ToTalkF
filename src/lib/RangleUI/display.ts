import {IEnvironment} from "./utils/environment";

export const PORTALS_ID = "rui-portals";

const toggleClassList = (elem: HTMLElement, condition: boolean, ...tokens: string[]) => {
  condition 
    ? elem.classList.add(...tokens)
    : elem.classList.remove(...tokens);
}

class Display {
  public static updateRoot(env: IEnvironment) {
    const root = document.documentElement;

    toggleClassList(root, !env.isMobile, "desktop");
    toggleClassList(root, env.isMobile, "mobile");
    toggleClassList(root, env.isLowResolution, "low-resolution");

    if (!document.getElementById(PORTALS_ID)) {
      const portals = document.createElement("div");
      portals.id = PORTALS_ID;
      document.body.appendChild(portals);
    }
  }
}

export default Display;