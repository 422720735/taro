import Taro, { Component } from './index'

declare module './index' {
  type MessageType = 'info' | 'success' | 'error' | 'warning'

  interface AtMessageOptions {
    message: string
    type?: MessageType
    duration?: number
  }

  interface RequestParams extends request.Option<any> {
    [propName: string]: any
  }

  type interceptor = (chain: Chain) => any

  interface Chain {
    index: number
    requestParams: RequestParams
    interceptors: interceptor[]
    proceed(requestParams: RequestParams): any
  }

  interface interceptors {
    logInterceptor(chain: Chain): Promise<any>

    timeoutInterceptor(chain: Chain): Promise<any>
  }

  interface Current {
    app: AppInstance | null
    router: RouterInfo | null
    page: PageInstance | null
    onReady: string
    onHide: string
    onShow: string
    preloadData?: Record<any, any>
    /**
     * RN 私有对象navigationRef，用于使用底层接口控制路由
     */
    rnNavigationRef?: React.RefObject<any>
  }

  interface TARO_ENV_TYPE {
    [TaroGeneral.ENV_TYPE.WEAPP]: TaroGeneral.ENV_TYPE.WEAPP
    [TaroGeneral.ENV_TYPE.WEB]: TaroGeneral.ENV_TYPE.WEB
    [TaroGeneral.ENV_TYPE.RN]: TaroGeneral.ENV_TYPE.RN
    [TaroGeneral.ENV_TYPE.SWAN]: TaroGeneral.ENV_TYPE.SWAN
    [TaroGeneral.ENV_TYPE.ALIPAY]: TaroGeneral.ENV_TYPE.ALIPAY
    [TaroGeneral.ENV_TYPE.TT]: TaroGeneral.ENV_TYPE.TT
    [TaroGeneral.ENV_TYPE.QQ]: TaroGeneral.ENV_TYPE.QQ
    [TaroGeneral.ENV_TYPE.JD]: TaroGeneral.ENV_TYPE.JD
  }

  interface TaroStatic {
    Events: {
      new (): TaroGeneral.Events
    }

    // eventCenter
    eventCenter: TaroGeneral.Events

    ENV_TYPE: TARO_ENV_TYPE

    getEnv(): TaroGeneral.ENV_TYPE

    render(component: Component | JSX.Element, element: Element | null): any

    internal_safe_set(...arg: any[]): any
    internal_safe_get(...arg: any[]): any

    atMessage(options: AtMessageOptions): void

    pxTransform(size: number, designWidth?: number): string
    initPxTransform(config: { designWidth: number; deviceRatio: TaroGeneral.TDeviceRatio }): void

    addInterceptor(interceptor: interceptor): any

    /**
     * 小程序引用插件 JS 接口
     */
    requirePlugin(pluginName: string): any

    setIsUsingDiff (flag: boolean)

    Current: Current

    getCurrentInstance(): Current
  }
}
