import React from 'react'
import { Countdown } from '@hzyhhh/components'
import '@hzyhhh/components/src/countdown/style/css'

const timeStamp = new Date().valueOf()
export default () => {
  return <Countdown timeStamp={timeStamp} />
  //   return <div >123</div>
}
