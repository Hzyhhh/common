import { noop } from './fn'
import { getUid } from './number'

const JSONP_PREFIX = '__jp'

/**
 * 解析查询字符串
 *
 * @example
 * ```js
 * searchParse(location.search | location.hash.split('?')[1] | '?id=1&name=a')
 * ```
 *
 * @param str 查询字符串
 *
 * @returns 格式化后对象
 */
export function searchParse(str: string) {
  const params: { [k: string]: string } = {}
  if (str) {
    const search = new URLSearchParams(str)
    search.forEach((v, k) => (params[k] = v))
  }
  return params
}

/**
 * 将对象反序列化为查询字符串, 返回值不包含'?'前缀
 *
 * @example
 * ```js
 * searchStringify([['id', 1],['name', 'a']] | {id: 1, name: 'a'})
 * ```
 *
 * @param params 格式化对象
 *
 * @returns 格式化后字符串
 */
export function searchStringify(
  params?: string | string[][] | Record<string, string> | URLSearchParams,
) {
  return new URLSearchParams(params).toString()
}

/**
 * 追加查询对象到url上
 *
 * @example
 * ```js
 * appendQuery(new URL('http://xxx.html?id=1'), { name: 'a' })
 * ```
 *
 * @returns 追加后的 url string
 */
export function urlAppendSearch(
  url: URL,
  params?: string | string[][] | Record<string, string> | URLSearchParams,
) {
  const str = searchStringify(params)
  url.search += str
  return url.href
}

/**
 * JSONP 请求
 * @param url 请求地址
 * @param params 请求参数
 * @param options 设置，可配置回调函数及超时时间
 */
export async function jsonp<T>(
  url: string,
  params: object,
  options: {
    callback?: string
    timeout?: number
  } = {},
) {
  const finalOptions = {
    callback: 'callback',
    timeout: 10000,
    ...options,
  }

  const prefix = `${JSONP_PREFIX}_${getUid()}`
  const finalParams = {
    [finalOptions.callback]: prefix,
    ...params,
  }
  const finalUrl = urlAppendSearch(new URL(url), finalParams)
  const target = document.getElementsByTagName('script')[0] || document.head
  const script = document.createElement('script')
  script.src = finalUrl

  return new Promise<T>((res, rej) => {
    let resolved = false
    let timer: number

    const cleanup = () => {
      if (resolved) {
        return
      }
      resolved = true
      clearTimeout(timer)
      if (script.parentNode) {
        script.parentNode.removeChild(script)
        // @ts-ignore
        window[prefix] = noop
      }
    }

    timer = window.setTimeout(() => {
      cleanup()
      rej(new Error('请求超时'))
    }, finalOptions.timeout)

    // @ts-ignore
    window[prefix] = (data: T) => {
      cleanup()
      res(data)
    }

    target.parentNode!.insertBefore(script, target)
  })
}
