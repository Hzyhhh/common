/**
 * 用户代理检测模块
 */
import { IN_SSR } from './react'

const UA = (IN_SSR ? '' : navigator.userAgent).toLowerCase()

/**
 * macOS
 */
export const isMac = UA.indexOf('macintosh') !== -1

/**
 * Windows
 */
export const isWindows = UA.indexOf('windows') !== -1

/**
 * 桌面端
 */
export const isDesktop = isMac || isWindows

/**
 * iphone
 */
export const isIphone = UA.indexOf('iphone') !== -1

/**
 * ipad
 */
export const isIpad = UA.indexOf('ipad') !== -1

/**
 * iOS
 */
export const isIos = isIphone || isIpad

/**
 * Apple 设备
 */
export const isApple = isIos || isMac

/**
 * Android
 */
export const isAndroid = UA.indexOf('android') !== -1

/**
 * isMobile
 */
export const isMobile = isIos || isAndroid

/**
 * 微信小程序
 */
export const isMiniProgram = UA.indexOf('miniprogram') !== -1

/**
 * 微信webview
 */
export const isWechat = UA.indexOf('micromessenger') !== -1

/**
 * 工作宝
 */
export const isGZB = UA.indexOf('gzb') !== -1

/**
 * Chrome
 */
export const isChrome = UA.indexOf('chrome') !== -1

/**
 * Safari
 */
export const isSafari = isApple && !isChrome

/**
 * Firefox
 */
export const isFirefox = UA.indexOf('firefox') !== -1

/**
 * Chrome 版本号
 */
export const ChromeVersion =
  isChrome &&
  (() => {
    const v = UA.match(/chrome\/(\d+)\./i)?.[1]
    return v ? parseInt(v) : 0
  })()

/**
 * Safari 版本号
 */
export const SafariVersion =
  isSafari &&
  (() => {
    const v = UA.match(/version\/(\d+)\.(\d+)/i)
    if (v) {
      return parseFloat(`${v[1]}.${v[2]}`)
    }
    return 0
  })()

/**
 * 工作宝版本号
 */
export const GZBVersion =
  isGZB &&
  (() => {
    const v = UA.match(/gzb\/(\d+)\.(\d+)/i)
    if (v) {
      return parseFloat(`${v[1]}.${v[2]}`)
    }
    return 0
  })()

/**
 * Firefox 版本号
 */
export const FirefoxVersion =
  isFirefox &&
  (() => {
    const v = UA.match(/firefox\/(\d+)\.(\d+)/i)
    if (v) {
      return parseFloat(`${v[1]}.${v[2]}`)
    }
    return 0
  })()
