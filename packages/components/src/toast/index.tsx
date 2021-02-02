/**
 * 实现简单的Toast
 */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

const ToastContainer = document.createElement('div')
ToastContainer.className = 'toast-container'
document.body.appendChild(ToastContainer)

export default function message(content: string, duration: number = 3000, mask?: boolean) {
  const div = <div className={`toast ${mask ? 'mask' : ''}`}>{content}</div>
  render(div, ToastContainer)
  const hide = () => {
    const toasts = document.getElementsByClassName('toast')
    if (toasts.length) {
      for (let i = 0, l = toasts.length; i < l; i++) {
        toasts[i].classList.add('removed')
      }
    }
    setTimeout(() => {
      unmountComponentAtNode(ToastContainer)
    }, 300)
  }

  if (duration > 0) {
    setTimeout(hide, duration)
  }
}
