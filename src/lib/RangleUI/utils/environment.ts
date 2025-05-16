export interface IEnvironment {
  isIOS: boolean;
  isMacOS: boolean;
  isMobile: boolean;
  isAndroid: boolean;
  isLowResolution: boolean;
  isWindowsDesktop: boolean;
}

class Environment {
  static currentEnv(): IEnvironment {
    const platform = navigator.platform.toLowerCase();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return {
      isMobile,
      isMacOS: platform.includes("mac"),
      isWindowsDesktop: /Windows NT/i.test(navigator.userAgent) || platform.includes("win"),
      isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
      isAndroid: /Android/i.test(navigator.userAgent),
      isLowResolution: isMobile || window.matchMedia("screen and (max-width: 900px)").matches
    }
  }
}

export default Environment;
