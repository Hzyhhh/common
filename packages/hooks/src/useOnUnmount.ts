import { useEffect, useRef } from 'react'

export default function useOnUnmount(fn: Function) {
  const fnRef = useRef(fn)

  useEffect(() => {
    return () => {
      if (fnRef.current) {
        fnRef.current()
      }
    }
  }, [])
}
