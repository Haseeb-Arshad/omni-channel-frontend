declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement | null;
    name?: string;
    offset?: number | [number, number];
    repeat?: boolean;
    smooth?: boolean;
    smoothMobile?: boolean;
    direction?: string;
    inertia?: number;
    class?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    scrollFromAnywhere?: boolean;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    resetNativeScroll?: boolean;
    tablet?: {
      smooth?: boolean;
      direction?: string;
      breakpoint?: number;
    };
    smartphone?: {
      smooth?: boolean;
      direction?: string;
    };
    reloadOnContextChange?: boolean;
    lerp?: number;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    
    on(event: string, callback: (...args: any[]) => void): void;
    update(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    scrollTo(target: string | number | HTMLElement, options?: any): void;
    
    scroll: {
      instance: {
        scroll: {
          x: number;
          y: number;
        };
      };
    };
  }
}
