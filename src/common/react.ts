/**
 * react 辅助方法
 */

/**
 * 是否处于服务器渲染模式
 */
export const IN_SSR = typeof navigator === 'undefined'

/**
 * 动态生成 css 类名
 * 通过传入kv对象，在判断value值，动态计算节点类名
 * 运用于状态切换时，类名的变化
 *
 * @param opt key-value 对象，通过判断 value 是否添加 key
 * @param other 静态类名
 *
 * @example
 *
 * ```js
 * cls({ active: true }, 'tab')  // => 'active tab'
 * cls({ active: false }, 'tab')  // => ' tab'
 * ```
 */
export function cls(opt: { [name: string]: any }, ...other: Array<string | undefined | null>) {
  return (
    Object.keys(opt)
      .filter(key => !!opt[key])
      // @ts-ignore
      .concat(other.filter(Boolean))
      .join(' ')
  )
}
