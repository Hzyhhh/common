
/**
 * 二分法 匹配数组中的元素
 * 排序数组
 */
export function devided(sourceArr: string[] | number[], target: string | number) {
    let start = 0, end = sourceArr.length - 1, middle, element
    middle = Math.floor((start + end) / 2)
    element = sourceArr[middle]
    while (start <= end) {
        if (target > element) {
            start = middle
        } else if (target < element) {
            end = middle
        } else {
            return element
        }
    }
    return -1
}