import React, { FC, useEffect, useMemo, useState } from 'react'
import { animated } from 'react-spring'
import { useCountdown } from '@hzyhhh/hooks'

import './style/index.css'

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

function Clock(props: { timeStamp: number }) {
  const { timeStamp } = props

  const [hour, setHour] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  const sTransitions = useCountdown(seconds)
  const mTransitions = useCountdown(minutes)
  const hTransitions = useCountdown(hour)

  useEffect(() => {
    const date = new Date(timeStamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    setHour(hour)
    setMinutes(minutes)
    setSeconds(seconds)
  }, [timeStamp])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds((v) => {
        if (v - 1 >= 0) {
          return v - 1
        }
        setMinutes((v) => {
          if (v - 1 >= 0) {
            return v - 1
          }
          setHour((v) => (v - 1 >= 0 ? v - 1 : 24))
          return 59
        })
        return 59
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [seconds, minutes, hour])

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
  console.log(timeStamp)

  const time = new Date(timeStamp)
  const hour = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const isOver = useMemo(() => {
    if (hour === 0 && minutes === 0 && seconds === 0) {
      return true
    }
    return false
  }, [])

  const renderNumber = (time: number) => {
    if (time === 0) {
      return <div className="click-wrapper">00:00:00</div>
    }
    return <Clock timeStamp={time} />
  }

  return isOver ? renderNumber(0) : renderNumber(timeStamp)
}

export default Countdown
