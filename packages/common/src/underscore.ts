// @ts-nocheck
/**
 * 该文件用于模拟实现underscore.js里的方法
 */

/**
 * optimizeCb
 */
function optimizeCb(func, context, args) {
  if (context === void 0) return func
  switch (args ? args : (args = 3)) {
    case 3:
      return function (value, index, source) {
        return func.call(context, value, index, source)
      }
  }
  return function () {
    func.apply(context)
  }
}

function likeArray(arr) {
  const sizeProperty = arr == null ? void 0 : arr.length
  return (
    typeof sizeProperty === 'number' &&
    sizeProperty > 0 &&
    sizeProperty < Number.MAX_SAFE_INTEGER
  )
}

/**
 * each
 * 用法:
 * _.each([1,2,3], alert)
 * _.each({a:1,b:2}, alert)
 */
export function each(data, iteratee, context) {
  let iterater = optimizeCb(iteratee, context)

  if (likeArray(data)) {
    data.forEach((i, idx) => {
      iterater(i, idx, data)
    })
  } else {
    Object.keys(data).forEach((i, idx) => {
      iterater(data[i], idx, data)
    })
  }
}
