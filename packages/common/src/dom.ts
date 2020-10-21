/**
 * DOM 相关方法
 */

import { IN_SSR } from './react'

/**
 * requestAnimationFrame
 */
export const raf = IN_SSR ? setImmediate : requestAnimationFrame

/**
 * cancelAnimationFrame
 */
export const caf = IN_SSR ? clearImmediate : cancelAnimationFrame

export function getInnerHeight(el: HTMLElement) {
  const { clientHeight } = el
  const { paddingTop, paddingBottom } = getComputedStyle(el)
  return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)
}

export function getInnerWidth(el: HTMLElement) {
  const { clientWidth } = el
  const { paddingLeft, paddingRight } = getComputedStyle(el)
  return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
