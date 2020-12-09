import React, { Suspense, lazy as l, ComponentType } from 'react'

/**
 * React lazy 的封装
 * 针对异步组件
 * https://zh-hans.reactjs.org/docs/code-splitting.html
 */
export function lazy<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  Fallback?: ComponentType,
) {
  const Comp = l(factory)

  return ((props) => {
    return (
      <Suspense fallback={Fallback ? <Fallback /> : <div>Loading...</div>}>
        <Comp {...props} />
      </Suspense>
    )
  }) as typeof Comp
}

export default lazy
