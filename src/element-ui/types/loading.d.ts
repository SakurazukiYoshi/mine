import Vue, { VNodeDirective } from 'vue'

/** Options used in loading service */
export interface LoadingServiceOptions {
  /** The DOM node loading needs to cover. Accepts a DOM object or a string. If it's a string, it will be passed to `document.querySelector` to get the corresponding DOM node */
  target?: HTMLElement | string

  /** Whether to make the mask append to the body element */
  body?: boolean

  /** Whether to show the loading mask in fullscreen */
  fullscreen?: boolean

  /** Whether to disable scrolling on body */
  lock?: boolean

  /** loading text that displays under the spinner */
  text?: string

  /** Class name of the custom spinner */
  spinner?: string

  /** Background color of the mask */
  background?: string

  /** Custom class name for loading */
  customClass?: string
}

/** loading Component */
export declare class ElLoadingComponent extends Vue {
  /** Close the loading instance */
  close (): void
}

/** loading directive definition */
export interface ElLoadingDirective extends VNodeDirective {
  name: 'loading',
  value: boolean,
  modifiers: {
    body: boolean,
    fullscreen: boolean
  }
}

/** Show animation while loading data */
export interface ElLoading {
  /** Install loading directive into Vue */
  install (vue: typeof Vue): void

  /** If you do not have a specific DOM node to attach the loading directive, or if you simply prefer not to use loading as a directive, you can call this service with some configs to open a loading instance. */
  service (options: LoadingServiceOptions): ElLoadingComponent

  directive: object
}

declare module 'vue/types/vue' {
  interface Vue {
    /** If you do not have a specific DOM node to attach the loading directive, or if you simply prefer not to use loading as a directive, you can call this service with some configs to open a loading instance. */
    $loading (options: LoadingServiceOptions): ElLoadingComponent
  }
}
