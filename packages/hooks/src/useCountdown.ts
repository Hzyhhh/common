import { useTransition } from 'react-spring'

export const useCountdown = (stable: number) => {
  const transitions = useTransition(stable, (p) => p, {
    from: { opacity: 0, transform: 'translate3d(0,-100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 1, transform: 'translate3d(0,100%,0)' },
  })

  return transitions
}

export default useCountdown
