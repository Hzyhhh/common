import React, { Component } from 'react'
import { cls } from '@hzyhhh/common'

interface ButtonProps {
  type?: 'default' | 'primary' | 'danger' | 'warning'
  onClick?: () => void
}

export default class PrimaryButton extends Component<ButtonProps, {}> {
  render() {
    const { type, onClick, children } = this.props
    return (
      <div
        className={cls({ [`${type}`]: !!type, 'primary-button': true })}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}
