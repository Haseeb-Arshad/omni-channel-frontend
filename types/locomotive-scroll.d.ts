declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    lerp?: number;
    smartphone?: { smooth?: boolean };
    tablet?: { smooth?: boolean };
    [key: string]: any;
  }

  class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    destroy(): void;
    update(): void;
    on(event: string, callback: () => void): void;
    scrollTo(target: number | string | HTMLElement, offset?: number, duration?: number): void;
    scroll: {
      instance: {
        scroll: {
          y: number;
        };
      };
    };
  }

  export default LocomotiveScroll;
}

declare module 'locomotive-scroll/dist/locomotive-scroll.css';
