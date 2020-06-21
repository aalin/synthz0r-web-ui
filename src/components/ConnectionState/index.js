import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import connectAPI from '../../connectors/api'

import styles from './styles.css'

const appRoot = document.getElementById('app-container')
const modalRoot = document.getElementById('connection-status-root')

class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
    appRoot.setAttribute('class', styles.appDisabled)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)

    if (modalRoot.children.length === 0) {
      const classNames = appRoot.getAttribute('class').split(' ').filter((c) => c !== styles.appDisabled).join(' ')

      if (classNames) {
        appRoot.setAttribute('class', classNames)
      } else {
        appRoot.removeAttribute('class')
      }
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

function ConnectionState({ api, children }) {
  if (api.connected) {
    return null
  }

  return (
    <Portal>
      <div className={styles.disconnectedFlash}>
        Connecting...
      </div>
    </Portal>
  )
}

export default connectAPI(ConnectionState)
