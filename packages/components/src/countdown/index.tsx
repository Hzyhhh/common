import React, { FC, useEffect, useRef, useState } from 'react'
import { animated } from 'react-spring'
import { useCountdown } from '@hzyhhh/hooks'

// @ts-ignore
const secendsArr = Array.from(new Array(60)).map((i, idx) => ({ style }) => (
  <animated.div style={{ ...style }}>
    {idx >= 10 ? idx : '0' + idx}
  </animated.div>
))

// @ts-ignore
const hourArr = Array.from(new Array(24)).map((i, idx) => ({ style }) => (
  <animated.div style={{ ...style }}>
    {idx >= 10 ? idx : '0' + idx}
  </animated.div>
))

function Clock(props: { timeStamp: number; onHideRefresh?: () => void }) {
  const { timeStamp, onHideRefresh: fn } = props

  const [hour, setHour] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const timeRef = useRef<{
    hour: number
    minutes: number
    seconds: number
  }>({
    hour,
    minutes,
    seconds,
  })

  const sTransitions = useCountdown(seconds)
  const mTransitions = useCountdown(minutes)
  const hTransitions = useCountdown(hour)

  useEffect(() => {
    const date = new Date(timeStamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    timeRef.current = { hour, minutes, seconds }
    setHour(hour)
    setMinutes(minutes)
    setSeconds(seconds)
  }, [])

  const handleTimerChange = () => {
    const { seconds, minutes, hour } = timeRef.current
    timeRef.current = {
      seconds: seconds > 0 ? seconds - 1 : 59,
      minutes: seconds === 0 ? (minutes > 0 ? minutes - 1 : 59) : minutes,
      hour: seconds === 0 && minutes === 0 ? (hour > 0 ? hour - 1 : 24) : hour,
    }
    if (document.visibilityState == 'visible') {
      const { hour, minutes, seconds } = timeRef.current

      setSeconds(seconds)
      setMinutes(minutes)
      setHour(hour)
    } else {
      /**
       * 优雅刷新的回调
       */
      if (fn) {
        fn()
      }
      /**
       * TODO: 离开屏幕强制刷新
       */
      window.location.reload()
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => handleTimerChange(), 1000)
    document.addEventListener('visibilitychange', handleTimerChange)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleTimerChange)
    }
  }, [seconds])

  return (
    <div className="clock-wrapper">
      <div className="hour">
        {hTransitions?.map(({ item, props, key }) => {
          const Page = hourArr[item]
          return <Page key={key} style={props} />
        })}
      </div>
      <span>:</span>
      <div className="minutes">
        {mTransitions?.map(({ item, props, key }) => {
          const Page = secendsArr[item]
          return <Page key={key} style={props} />
        })}
      </div>
      <span>:</span>
      <div className="seconds">
        {sTransitions?.map(({ item, props, key }) => {
          const Page = secendsArr[item]
          return <Page key={key} style={props} />
        })}
      </div>
    </div>
  )
}

interface CountdownProps {
  className?: string
  timeStamp: number
  style?: React.CSSProperties
}

export const Countdown: FC<CountdownProps> = (props) => {
  const { timeStamp } = props

  const renderNumber = (time: number) => {
    if (time === 0) {
      return <div className="click-wrapper">00:00:00</div>
    }
    return <Clock timeStamp={time} />
  }

  return renderNumber(timeStamp)
}

export default Countdown
